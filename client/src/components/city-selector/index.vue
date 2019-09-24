<style scoped lang="less">
.city-container{
  display:flex;
  justify-content: flex-end;
  .q-field{
    flex:1;
    font-size: 13px;
  color: #333;
    /deep/.q-field__append{
      padding-left:0;
    }
    /deep/.q-field__native{
      max-width:5em;
      overflow:hidden;
      white-space: nowrap;
      flex-direction: row-reverse;
    }
    /deep/.q-field__control::after{
      background: transparent!important;
    }
    /deep/.q-field__control::before{
      border-bottom: transparent!important;
    }
  }
}
</style>
<template>
  <div class="city-container">
    <q-select v-for="(item, level) in selectors"
              :key="level"
              v-bind="props"
              :options="item.options"
              :value="item.value"
              option-value="id"
              :option-label="o=>o.name||item.name"
              @input="change($event.id, level)"
    ></q-select>
  </div>
</template>
<script>
import citys from 'app/src/assets/jsons/city.json'

/**
 * 城市选择器 支持v-model双向绑定
 * @props value 已选中的值
 * @props level 显示层级默认显示到最低级
 * @event input 当选择值有变化时触发
 * */
export default {
  props: {
    value: [String, Number],
    level: {
      type: Number,
      default: () => Infinity
    },
    setFirst: Boolean
  },
  data () {
    return {
      focusValue: this.value,
      focusLevel: 0
    }
  },
  computed: {
    props () {
      let _thisProps = ['options', 'key'].concat(Object.keys(this.$options.props))
      let _props = Object.keys(this.$attrs).filter(k => !_thisProps.includes(k)).map(k => ({ [k]: this.$attrs[k] }))
      return Object.assign({}, ..._props)
    },
    selectors () {
      let deep = !1
      let level = 0
      let value = parseInt(this.focusValue) || NaN
      let selectors = [{ options: citys.map(filter), value: NaN }]
      this.$funs.deepEach(citys, (item, _break, index) => {
        if (deep || isNaN(value) || (value < item.max_id && value >= item.id) || value === item.id) {
          _break()
          selectors[level].value = item.id
          selectors[level].name = item.name
          if ((item.id !== value && !deep && !isNaN(value)) || level + 1 < this.level) {
            if (item.children) {
              level++
              if (item.id === value) deep = true
              selectors[level] = { options: item.children.map(filter), value: 0 }
            }
            return item.children
          }
        }
      })
      if (isNaN(selectors[0].value)) {
        this.$nextTick(() => this.$set(this, 'focusValue', NaN))
      } else if (isNaN(value) && this.setFirst) {
        this.$nextTick(() => this.$emit('input', this.CurrentValue))
      }
      return selectors
    },
    CurrentValue () {
      return this.selectors[this.selectors.length - 1].value
    }
  },
  methods: {
    change (value, level) {
      if (value === void 0) return
      this.focusValue = value
      this.curLevel = level
      this.$nextTick(() => this.$emit('input', this.CurrentValue))
    }
  },
  watch: {
    value (value) {
      if (this.CurrentValue !== value) this.change(value)
    }
  }
}
function filter (item) {
  return {
    id: item.id,
    name: item.name,
    level: item.level,
    max_id: item.max_id
  }
}
</script>
