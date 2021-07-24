<template>
  <div>
    <div v-if="nodeSelectedObject.children" class="select-tree">
      <div class="wrapper">
        <q-item tag="label" v-ripple dense>
          <q-item-section side top>
            <q-checkbox
              indeterminate-value="somechecked"
              color="accent"
              v-model="nodeSelectedObject.selected"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="nodeSelectedObject.label"></q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="app-extension-select-tree-children-items">
        <q-item
          dense
          v-for="child in nodeSelectedObject.children"
          :key="child[nodeKey]"
          tag="label"
          v-ripple
        >
          <q-item-section side top>
            <q-checkbox color="accent" v-model="child.selected" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="child.label"></q-item-label>
          </q-item-section>
        </q-item>
        <q-separator inset></q-separator>
      </div>
    </div>
    <div v-else>
      <q-item
        dense
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
        class="custom-checkbox"
      >
        <q-item-section side top>
          <q-checkbox
            color="accent"
            :value="scope.selected"
            @input="scope.toggleOption(scope.opt)"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label v-html="scope.opt.label"></q-item-label>
        </q-item-section>
      </q-item>
    </div>

  </div>
</template>

<script>
export default {
  name: "QOptionTree",
  props: {
		scope: Object,
  },
  data() {
    return {
      nodeSelectedObject: {...this.scope.opt}
    };
  },
  computed: {
    selectedChild () {
      return this.nodeSelectedObject && this.nodeSelectedObject.children && this.nodeSelectedObject.children.length ? this.nodeSelectedObject.children.filter(e => e.selected).length : null
    },
    modeSelected () {
      return this.nodeSelectedObject.selected ? this.nodeSelectedObject.selected : false
    }
  },
  watch: {
    selectedChild(nv, ov) {
      this.$emit('passStateToModel', this.nodeSelectedObject.children.filter(e => e.selected), this.nodeSelectedObject)
			if (nv < ov) {
				if (nv === 0) {
					this.nodeSelectedObject.selected = false
				} else {
					this.nodeSelectedObject.selected = 'somechecked'
				}
			}
			if (nv) {
				if (nv === this.nodeSelectedObject.children.length) {
					this.nodeSelectedObject.selected = true
					return
				}
				this.nodeSelectedObject.selected = 'somechecked'
			}
    },
    modeSelected(nv, ov) {
      if (nv === true) {
				this.nodeSelectedObject.children.forEach(element => { element.selected = true })
				this.$emit('passStateToModel', this.nodeSelectedObject.children.map(e => {
					return {
						...e,
						selected: true
					}
				}), this.nodeSelectedObject)
			}
			if (nv === false) {
				this.nodeSelectedObject.children.forEach(element => { element.selected = false })
				this.$emit('passStateToModel', [], this.nodeSelectedObject)
			}
    }
  }
};
</script>

<style scoped>
.app-extension-select-tree-children-items .q-item {
  padding-left: 3rem !important;
}
</style>
