<template>
  <div>{{content}}</div>
</template>
<script>
import base from './base'
export default {
  extends: base,
  methods: {
    toString (content) {
      return '[任务]'
    }
  }
}
</script>
