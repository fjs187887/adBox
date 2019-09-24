<style scoped lang="less">
a, img{
  width:100%;
  height:100%;
}
</style>
<template>
  <a href="javascript:;"><img :src="ad.img"></a>
</template>
<script>
import base from './base'
export default {
  extends: base
}
</script>
