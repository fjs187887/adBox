<style scoped lang="less">
  .ad{
    height: 60px;
    width: 100%;
    margin-bottom:10px;
  }
  .ad.add{
    display:flex;
    align-items: center;
    justify-content: center;
  }
</style>
<template>
  <div class="container">
    <div class="ad add">
      <q-btn color="primary" class="full-width" @click="openAdd()">添加广告</q-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectModel: {
      type: Boolean,
      default: false
    },
    selected: {
      type: [Array, void 0, null],
      default: () => []
    }
  },
  data () {
    return {
      title: '我的广告'
    }
  },
  created () {
    this.getAds()
  },
  methods: {
    getAds () {
      this.$http.getHotAds(this.page, ({ errcode, data, message }) => {
        if (errcode === 0) {
          this.list = this.list.concat(data.list)
          this.hasMore = data.has_more
        }
      })
    },
    openAdd () {}
  }
}
</script>
