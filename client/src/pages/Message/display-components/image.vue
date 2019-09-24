<template>
  <div><q-img src="content"></q-img></div>
</template>
<script>
import base from './base'
export default {
  extends: base,
  methods: {
    toString (content) {
      return '[图片]'
    }
  }
}
</script>
