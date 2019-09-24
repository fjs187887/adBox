<template>
    <!-- 通知 -->
  <q-item></q-item>
</template>

<script>
export default {
  inject: ['setTitle'],
  mounted () {
    this.setTitle('通知')
  }
}
</script>

<style lang="scss" scoped>
</style>
