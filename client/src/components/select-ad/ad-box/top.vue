<style scoped lang="less">
.top-ad{
  @height: 50px;
  margin:0;
  height: @height;
  .ivu-row-flex{
    z-index: 10;
    top:0; left: 0;
    position: fixed;
    padding: 0 10px;
    line-height: 50px;
    width: 100%; height: @height;
  }
}
</style>
<template>
  <div class="top-ad" v-if="showTop">
    <Row class="text-white bg-primary" type="flex">
      <i-col>AD宝</i-col>
      <i-col style="flex:1; text-align: center">每天花5秒分享立即赚钱的APP</i-col>
      <i-col>立即下载</i-col>
      <q-badge color="white" text-color="primary" floating transparent @click="close">
        <Icon type="md-close"></Icon>
      </q-badge>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      default: true
    },
    allowClose: {
      default: true
    }
  },
  data () {
    return {
      showTop: this.show
    }
  },
  methods: {
    close () {
      if (this.allowClose) {
        this.$emit('update:show', this.showTop = false)
      }
    }
  },
  watch: {
    show (nv) {
      this.showTop = nv
    }
  }
}
</script>
