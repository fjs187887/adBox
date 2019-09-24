<template>
  <q-layout>
    <div>{{qrCode}}</div>
  </q-layout>
</template>

<script>
export default {
  inject: ['setTitle'],
  mounted () {
    this.setTitle('扫一扫')
  },
  data () {
    return {
      qrCode: ''
    }
  },
  created () {
    this.qrCode = this.$route.query.data
    console.log(this.$route.query.data)
  }
}
</script>

<style scoped>

</style>
