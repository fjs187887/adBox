<template>
  <div>
    <div style="font-size: 16px;margin: 10px 0;color: #eeeeee">{{content.title}}</div>
    <div style="font-size: 14px;color: #eeeeee">{{content.content}}</div>
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
      return '[审核]'
    }
  }
}
</script>
