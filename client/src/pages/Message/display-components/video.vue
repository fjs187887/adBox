<template>
  <div><q-image src="content"></q-image></div>
</template>
<script>
import base from './base'
export default {
  extends: base,
  methods: {
    toString (content) {
      return '[视频]'
    }
  }
}
</script>
