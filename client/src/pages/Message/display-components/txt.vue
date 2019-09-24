<template>
  <div>{{message.content}}</div>
</template>
<script>
import base from './base'
export default {
  extends: base,
  methods: {
    toString (content) {
      return content || this.message.content
    }
  }
}
</script>
