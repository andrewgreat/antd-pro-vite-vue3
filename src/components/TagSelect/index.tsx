import {defineComponent, ref } from 'vue';
// import PropTypes from 'ant-design-vue/es/_util/vue-types'
import Option from './TagSelectOption'
import { filterEmpty } from '@/utils/userFormat'


export default defineComponent({
  name: 'TagSelect',
  components:{
    Option
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-tag-select'
    },
    // @ts-ignore
    defaultValue: {
      type: Array,
      default: null,
    },
    // @ts-ignore
    value: {
      type: Array,
      default: null
    },
    expandable: {
      type: Boolean,
      default: false
    },
    hideCheckAll: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots, emit }) {
    // Option
    const hideCheckAll = props.hideCheckAll
    // const expand = ref(false)
    const localCheckAll = ref(false)

    const getItemsKey = (items) => {
      const totalItem = {}
     items && items.forEach(item => {
        totalItem[item.componentOptions.propsData && item.componentOptions.propsData.value] = false
      })
      return totalItem
    }

    // @ts-ignore
    const items = getItemsKey(filterEmpty(slots.default()[0].children))

    // const val = ref(props.value || props.defaultValue || [])

    const onChange = (checked) => {
      const key = Object.keys(items).filter(key => key === checked.value)
      console.log(key)
      // @ts-ignore
      items[key] = checked.checked
      const bool = Object.values(items).lastIndexOf(false)
      localCheckAll.value = bool === -1;
    }
    const onCheckAll = (checked) => { {
      Object.keys(items).forEach(v => {
        items[v] = checked.checked
      })
      localCheckAll.value = checked.checked
    }

    // CheckAll Button
    const renderCheckAll = () => {
      const props = {
        on: {
          change: (checked) => {
            onCheckAll(checked)
            checked.value = 'total'
            emit('change', checked)
          }
        }
      }
      // @ts-ignore
      const checkAllElement = <Option key={'total'} checked={localCheckAll} {...props}>All</Option>
      return !hideCheckAll && checkAllElement || null
    }
    // expandable
    // const renderExpandable = () => {
    //
    // }
    // render option
    const renderTags = (items) => {
      const listeners = {
        change: (checked) => {
          onChange(checked)
          emit('change', checked)
        }
      }

      return items.map(vnode => {
        const options = vnode.componentOptions
        options.listeners = listeners
        return vnode
      })
    }

    const render = () => {
        const { prefixCls }  = props
        const classString = {
          [`${prefixCls}`]: true
        }
        // @ts-ignore
      const tagItems = filterEmpty(slots.default())
         return (
          <div class={classString}>
            {renderCheckAll()}
            {renderTags(tagItems)}
          </div>
        )
      }
     return () => render()
    }
  }

})
