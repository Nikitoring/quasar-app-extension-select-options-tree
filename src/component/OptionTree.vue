<template>
  <div>
    <q-tree
      no-connectors
      :nodes="options"
      :node-key="nodeKey"
      tick-strategy="leaf"
      :ticked.sync="tickedModel"
      @update:ticked="
        target => {
          setModel(target);
        }
      "
      default-expand-all
    >
    </q-tree>
  </div>
</template>

<script>
export default {
  name: "QOptionTree",
  props: {
    options: Array,
    parent: Object,
    nodeKey: String,
    model: Array,
    ticked: Array
  },
  data() {
    return {
      tickedModel: this.ticked.map(e => e[this.nodeKey]),
    };
  },
  methods: {

    setModel(target) {
      const targetArray = target.map(element => {
        return this.options[0].children.find(e => e[this.nodeKey] === element) 
      })
      this.$emit("passToModel", {
        target: targetArray,
        root: this.options[0]
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
