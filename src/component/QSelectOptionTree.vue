<template>
  <q-select
    filled
    multiple
    v-model="model"
    :options="options"
    :label="label"
    :color="color"
    clearable
  >
    <template
      v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }"
    >
      <template v-if="opt.children">
        <q-tree
          no-connectors
          :nodes="[opt]"
          node-key="value"
          tick-strategy="leaf"
          :ticked.sync="tickedModel"
          @update:ticked="
            (target) => {
              setModel(target, opt);
            }
          "
          default-expand-all
        />
      </template>
      <template v-else>
        <q-item
          v-bind="itemProps"
          v-on="itemEvents"
          class="custom-checkbox"
          :class="opt.parent ? 'q-ml-md' : ''"
          
        >
          <q-item-section side top>
            <q-checkbox
              toggle-indeterminate
              color="accent"
              :value="selected"
              @input="toggleOption(opt)"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label v-html="opt.label"></q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </template>
  </q-select>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped></style>
