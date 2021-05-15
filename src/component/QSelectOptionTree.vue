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
          :nodeKey="nodeKey"
          :ticked="tickedModel[opt[nodeKey]] ? tickedModel[opt[nodeKey]] : []"
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
  name: "PageIndex",
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
      tickedModel: [],
      optionsclone: this.options && this.options.length ? this.options : [],
    };
  },
  methods: {
    setModel ({ target, root }) {
      // Check remove element
      if (this.tickedModel[root.value] && this.tickedModel[root.value].length > target.length) {
        const uniq = this.tickedModel[root.value].filter(e => target.findIndex(a => a[this.nodeKey] === e[this.nodeKey]) === -1)
        if (uniq && uniq[0]) {
          const indexRemove = this.model.findIndex(e => e[this.nodeKey] === uniq[0][this.nodeKey])
          if (indexRemove !== -1) this.model.splice(indexRemove, 1)
        }

      }
      this.tickedModel[root.value] = target // Set new ticked tree elements

      const currInd = this.optionsclone.findIndex(e => e[this.nodeKey] === root[this.nodeKey])

      if (target.length === root.children.length) {
        target.forEach(e => {
          const indexInModel = this.model.findIndex(a => (e === a) || (e[this.nodeKey] === a[this.nodeKey]))
          if (indexInModel !== -1) {
            this.model.splice(indexInModel, 1)
            this.setValue(this.model)
          }
        })
        this.model = [...this.model, root]
        this.model = [...new Set(this.model.map(e => JSON.stringify(e) ))].map(e => JSON.parse(e))
        this.setValue(this.model)
      } else {
        const rootIndex = this.model.findIndex(e => e[this.nodeKey] === root[this.nodeKey])

        if (rootIndex !== -1) {
          this.model.splice(rootIndex, 1)
          this.setValue(this.model)
        }
        this.optionsclone[currInd].children.forEach(element => {
          const targetIndex =  target.findIndex(a => a[this.nodeKey] === element[this.nodeKey])
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
        const removeIndex = this.tickedModel[this.optionsclone[details.value.parent][this.nodeKey]].findIndex(e => e[this.nodeKey] === details.value[this.nodeKey])
        if (removeIndex !== -1) this.tickedModel[this.optionsclone[details.value.parent][this.nodeKey]].splice(removeIndex, 1)
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

