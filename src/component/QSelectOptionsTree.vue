<template>
  <q-select
    v-bind="attributes"
    multiple
    v-model="model"
    :options="optionsclone"
    clearable
    @clear="
      (val) => {
        selectClear(val);
      }
    "
    @remove="
      (details) => {
        removeOption(details);
      }
    "
  >
    <template v-slot:option="{ opt }">
      <div v-if="opt.children" :key="`${opt.value}`">
        <OptionTree
          :options="[...opt]"
          :parent="opt"
          :nodeKey="optionKey"
          :ticked="tickedModel[opt[optionKey]] ? tickedModel[opt[optionKey]] : []"
          :model="model"
          @passToModel="setModel"
        />
      </div>
    </template>
  </q-select>
</template>
<script>
import OptionTree from 'src/components/OptionTree.vue'
export default {
  name: "QSelectOptionsTree",
  components: {OptionTree},
  props: {
    attributes: Object,
    nodeKey: String,
    options: Array,
    value: Array,
    setValue: Function
  },
  data() {
    return {
      model: [],
      optionKey: this.nodeKey ? this.nodeKey : 'value',
      tickedModel: [],
      optionsclone: this.options && this.options.length ? this.options : [],
    };
  },
  methods: {
    setModel ({ target, root }) {
      // Check remove element
      if (this.tickedModel[root.value] && this.tickedModel[root.value].length > target.length) {
        const uniq = this.tickedModel[root.value].filter(e => target.findIndex(a => a[this.optionKey] === e[this.optionKey]) === -1)
        if (uniq && uniq[0]) {
          const indexRemove = this.model.findIndex(e => e[this.optionKey] === uniq[0][this.optionKey])
          if (indexRemove !== -1) this.model.splice(indexRemove, 1)
        }

      }
      this.tickedModel[root.value] = target // Set new ticked tree elements

      const currInd = this.optionsclone.findIndex(e => e[this.optionKey] === root[this.optionKey])

      if (target.length === root.children.length) {
        target.forEach(e => {
          const indexInModel = this.model.findIndex(a => (e === a) || (e[this.optionKey] === a[this.optionKey]))
          if (indexInModel !== -1) {
            this.model.splice(indexInModel, 1)
            this.setValue(this.model)
          }
        })
        this.model = [...this.model, root]
        this.model = [...new Set(this.model.map(e => JSON.stringify(e) ))].map(e => JSON.parse(e))
        this.setValue(this.model)
      } else {
        const rootIndex = this.model.findIndex(e => e[this.optionKey] === root[this.optionKey])

        if (rootIndex !== -1) {
          this.model.splice(rootIndex, 1)
          this.setValue(this.model)
        }
        this.optionsclone[currInd].children.forEach(element => {
          const targetIndex =  target.findIndex(a => a[this.optionKey] === element[this.optionKey])
          if (targetIndex !== -1) this.optionsclone[currInd].children[targetIndex].parent = currInd
        });
        this.model = [...this.model, ...target]
        this.model = [...new Set(this.model.map(e => JSON.stringify(e) ))].map(e => JSON.parse(e))
        this.setValue(this.model)
      }

    },
    selectClear(val) {
      this.model = []
      this.setValue(this.model)
      this.tickedModel = {};
    },
    removeOption(details) {
      if (details.value && details.value.parent !== null) {
        const removeIndex = this.tickedModel[this.optionsclone[details.value.parent][this.optionKey]].findIndex(e => e[this.optionKey] === details.value[this.optionKey])
        if (removeIndex !== -1) this.tickedModel[this.optionsclone[details.value.parent][this.optionKey]].splice(removeIndex, 1)
      }
    }
  }
};
</script>

<style lang="scss">
.q-item__section--side {
  padding-right: 4px !important;
}
.q-item__section--avatar {
  min-width: 25px;
}
</style>

