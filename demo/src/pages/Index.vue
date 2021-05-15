<template>
  <q-page class="flex flex-center">
    <select-tree 
      :attributes="attributes"
      :setValue="setValue"
      :options="options"
      :nodeKey="nodeKey"
      />
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
    data() {
    return {
      model: [],
      attributes: {
        label: "Test",
        color: "acccent",
        'use-chips': true,
        filled: true
      },
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
        }
      ]
    };
  },
  methods: {
    setValue (val) {
      this.model = val
    }
  },
}
</script>
