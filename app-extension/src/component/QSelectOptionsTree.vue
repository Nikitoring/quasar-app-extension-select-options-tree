<template>
  <q-select
    ref="refQSelectOptionsTree"
    v-bind="attributes"
    multiple
    v-model="model"
    :options="optionsOrigin"
    @remove="removeOption"
    @clear="clearSelect"
    @input="setModel"
  >
    <template v-slot:option="scope">
      <OptionTree
        :scope="scope"
        @passStateToModel="checkGroupState"
        :nodeKey="optionKey"
      />
    </template>
  </q-select>
</template>
<script>
  import OptionTree from "./OptionTree.vue";
  export default {
    name: "QSelectOptionsTree",
    components: { OptionTree },
    props: {
      attributes: Object,
      nodeKey: String,
      options: Array,
      setValue: Function,
      slots: Array,
    },
    data() {
      return {
        model: [],
        optionKey: this.nodeKey ? this.nodeKey : "value",
        selectedModel: {},
        optionsOrigin: this.options && this.options.length ? this.options : [],
      };
    },
    methods: {
      checkGroupState(arr, root) {
        let cloneModel = [...this.model];
        // *Check remove element
        if (
          arr &&
          this.selectedModel[root[this.optionKey]] &&
          this.selectedModel[root[this.optionKey]].length > arr.length
        ) {
          const uniq = this.selectedModel[root[this.optionKey]].filter((e) =>
            arr.findIndex((a) => a[this.optionKey] === e[this.optionKey])
          );
          if (uniq && uniq[0]) {
            const indexRemove = cloneModel.findIndex(
              (e) => e[this.optionKey] === uniq[0][this.optionKey]
            );
            if (indexRemove !== -1) cloneModel.splice(indexRemove, 1);
          }
        }
        this.selectedModel[root[this.optionKey]] = arr; //* Update selectedModel
        // *Check selected all children
        let indexFromOptions = this.optionsOrigin.findIndex(
            (e) => e[this.optionKey] === root[this.optionKey]
          );
        if (arr.length === root.children.length) {
          arr.forEach((o) => {
            let indexChild = cloneModel.findIndex(
              (e) => e[this.optionKey] === o[this.optionKey]
            );
            if (indexChild !== -1) cloneModel.splice(indexChild, 1);
          });
          this.optionsOrigin[indexFromOptions].selected = true;
          if (
            cloneModel.findIndex(
              (e) => e[this.optionKey] === root[this.optionKey]
            ) === -1
          )
            cloneModel = [...cloneModel, root];
        } else {
          this.optionsOrigin[indexFromOptions].selected = false;
          let rootIndex = cloneModel.findIndex(
            (e) => e[this.optionKey] === root[this.optionKey]
          );
          if (rootIndex !== -1) cloneModel.splice(rootIndex, 1);
          arr.forEach((a) => {
            if (
              cloneModel.findIndex(
                (e) => a[this.optionKey] === e[this.optionKey]
              ) === -1
            )
              cloneModel.push(a);
          });
        }
        this.model = [...cloneModel];
        this.setModel(this.model);
      },
      removeOption({ index, value }) {
        let root = this.optionsOrigin.find(
          (e) => e[this.optionKey] === value[this.optionKey]
        );
        if (root) root.selected = false;
        for (let elem in this.selectedModel) {
          let indexRemove = this.selectedModel[elem].findIndex(
            (e) => e[this.optionKey] === value[this.optionKey]
          );
          if (indexRemove !== -1) {
            this.selectedModel[elem][indexRemove].selected = false;
          }
        }
      },
      clearSelect(val) {
        for (let opt of this.optionsOrigin) {
          if (opt.selected) opt.selected = false;
          if (opt.children && opt.children.length) {
            opt.children.forEach((el) => {
              el.selected = false;
            });
          }
        }
        this.model = [];
      },
      setModel(val) {
        if (this.setValue) this.setValue(val);
      },
    },
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
