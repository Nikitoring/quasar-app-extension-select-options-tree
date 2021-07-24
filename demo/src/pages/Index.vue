<template>
  <q-page class="flex flex-center wrap">
    <div class="row jsutify-between items-center">
      <!-- With Tree -->
      <div class="q-mr-md">With Tree: </div>
      <div class="q-pa-md" style="width: 300px">
        <div class="q-gutter-md">
        <select-tree
          :options="options"
          nodeKey="value"
        />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
// import QSelectOptionTree from 'quasar-app-extension-select-options-tree'
export default {
  name: "PageIndex",
  data() {
    return {
      model: [],
      key: 0,
      tickedModel: [],
      selectedModel: [],
      label: "Test",
      color: "acccent",
      nodeKey: "value",
      addedChildCounter: {},
      options: [
        {
          label: "American cars",
          value: "american",
          selected: false,
          children: [
            {
              label: "Ford",
              value: "Frd",
              selected: false
            },
            {
              label: "General Motors",
              value: "Gnrl Mtrs",
              selected: false
            },
            {
              label: "Tesla",
              value: "Tsl",
              selected: false
            }
          ]
        },
        {
          label: "German cars",
          value: "German",
          selected: false,
          children: [
            {
              label: "Audi",
              value: "Audi",
              selected: false
            },
            {
              label: "BMW",
              value: "BMW",
              selected: false
            },
            {
              label: "Porsche",
              value: "Porsche",
              selected: false
            }
          ]
        },
        {
          label: 'Lada',
          value: 'Lada',
          selected: false
        },
        {
          label: 'Honda',
          value: 'Honda'
        }
      ]
    };
  },
  computed: {
    computedModel() {
      return this.model;
    }
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

      const currInd = this.options.findIndex(e => e[this.nodeKey] === root[this.nodeKey])

      if (target.length === root.children.length) {
        target.forEach(e => {
          const indexInModel = this.model.findIndex(a => (e === a) || (e[this.nodeKey] === a[this.nodeKey]))
          if (indexInModel !== -1) {
            this.model.splice(indexInModel, 1)
          }
        })
        this.model = [...this.model, root]
        this.model = [...new Set(this.model.map(e => JSON.stringify(e) ))].map(e => JSON.parse(e))
      } else {
        const rootIndex = this.model.findIndex(e => e[this.nodeKey] === root[this.nodeKey])

        if (rootIndex !== -1) {
          this.model.splice(rootIndex, 1)
        }
        this.options[currInd].children.forEach(element => {
          const targetIndex =  target.findIndex(a => a[this.nodeKey] === element[this.nodeKey])
          if (targetIndex !== -1) this.options[currInd].children[targetIndex].parent = currInd
        });
        this.model = [...this.model, ...target]
        this.model = [...new Set(this.model.map(e => JSON.stringify(e) ))].map(e => JSON.parse(e))
      }

    },
    selectClear(val) {
      this.model = []
      this.tickedModel = {};
    },
    removeOption(details) {

      if (details.value && details.value.parent !== null) {
        const removeIndex = this.tickedModel[this.options[details.value.parent][this.nodeKey]].findIndex(e => e[this.nodeKey] === details.value[this.nodeKey])
        if (removeIndex !== -1) this.tickedModel[this.options[details.value.parent][this.nodeKey]].splice(removeIndex, 1)
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
