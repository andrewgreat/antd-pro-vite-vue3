import { defineComponent, ref, watch } from 'vue';
import { Tag } from 'ant-design-vue'

export default defineComponent({
  name: 'TagSelectOption',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-tag-select-option'
    },
    value: {
      type: [String, Number, Object],
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  setup (props,{ slots, emit }) {
    const { CheckableTag } = Tag
    const localChecked = ref(props.checked || false)
    const checked = ref(props.checked)
    const value = ref(props.value)

    watch(checked, (val) => {
      localChecked.value = val
    })

    const render = () => {
      const onChange = (checked) => {
        emit('change', { value, checked })
      }

      // @ts-ignore
      return (<CheckableTag key={value} vModel={localChecked} onChange={onChange}>{(slots.default())}</CheckableTag>)
    }

    return () => render()
  }
})
