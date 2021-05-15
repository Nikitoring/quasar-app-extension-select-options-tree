import { QSelect } from 'quasar'
import { slot } from 'quasar/src/utils/slot.js'
export default {
  name: 'QSelectOptionsTree',
  props: {
    label: String,
    options: Array,
    clearable: Boolean,
    hideDropdownIcon: Boolean,
    value: Array,
    optionValue: [Function, String],
    useChips: Boolean
  },
  methods: {
    __getSelectContent (h) {
        h(QSelect, {
          props: {
            label: this.label,
            options: this.options,
            stackLabel: this.stackLabel,
            clearable: this.clearable,
            hideDropdownIcon: this.hideDropdownIcon,
            value: this.value,
            optionValue: this.optionValue,
            useChips: this.useChips
          }
        })
    }
  },
  render(h) {
    return h('div', {

    })
  },
}