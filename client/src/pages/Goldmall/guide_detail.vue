<template>
  <q-layout class="animated fadeIn">
    <!-- 商品详情 -->
    <div class="cenInfo">
      <div class="infoItem">
        <div class="itemContent" v-html="content"></div>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
      content: ''
    }
  },
  created () {
    var data = this.$route.query.data
    this.setTitle(data.title)
    this.content = data.detail
  }
}
</script>

<style scoped lang="less">
  .cenInfo{
    padding: 0 15px;
    .infoItem{
      p.itemTit{
        padding: 20px 0;
        font-size: 14px;
        color: #333;
        font-weight: 700;
      }
      /deep/.itemContent{
        padding-bottom: 70px;
        ul,li{
          list-style: none;
        }
        img{
          width: 100%;
          height: auto;
        }
        p{
          margin: 5px 0;
        }
      }
    }
  }
</style>
