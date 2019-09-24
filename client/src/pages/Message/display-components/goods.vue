<template>
  <div>
    {{content}}
  </div>
</template>
<script>
import base from './base'
export default {
  extends: base,
  methods: {
    toString (content) {
      return '[商品]'
    }
  }
}
</script>
