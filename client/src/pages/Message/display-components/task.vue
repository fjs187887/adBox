<template>
  <div>
    <div style="font-size: 16px;margin: 10px 0;color: #eeeeee">{{content.title}}</div>
    <div style="font-size: 14px;color: #eeeeee">{{content.content}}</div>
    <div style="margin: 10px 0;font-size: 14px;color: #d62d20"><span @click="top()">详情>></span></div>
  </div>
</template>
<script>
import base from './base'
import funs from 'src/libs/functions'
export default {
  extends: base,
  mounted () {
    console.log(this.content)
  },
  data () {
    return {
      content: funs.safeJsonParse(this.message.content)
    }
  },
  methods: {
    toString (content) {
      return '[任务]'
    },
    top () {
      if (this.content.type === 1) {
        this.$router.push({ path: '/review' })
      } else if (this.content.type === 2) {
        this.$router.push({ path: '/sharetask/task-all' })
      }
    }
  }
}
</script>
