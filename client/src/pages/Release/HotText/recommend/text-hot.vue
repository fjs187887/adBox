<style scoped lang="less">
.itemList{
  padding: 0 15px;
  .item{
    position: relative;
    width: 100%;
    padding: 20px 0;
    background: #fff;
    .cenBox{
      .cenImgBox{
        float: left;
        border-radius: 4px;
        overflow: hidden;
        padding-right: 15px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .cenTit{
        display: block;
        width: 100%;
        font-size: 14px;
        color: #333;
        padding-top: 4px;
        opacity: 1;
        line-height: 24px;
      }
      .cenMoney{
        margin-top: 25px;
        font-size: 12px;
        color: #999;
        align-items: center;
        .q-btn{
          float: right;
          height: 28px;
          min-height: 0;
          padding: 0;
          font-size: 12px;
          color:#fff;
          background: #ff853a;
          box-shadow: none;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>

<template>
  <q-infinite-scroll @load="getData" :offset="250">
    <q-pull-to-refresh @refresh="refresh">
      <div class="itemList">
        <div class="item btBorder" v-for="item in listInfo" :key="item.source" >
          <div class="row cenBox">
            <div class="cenImgBox col-4"><img :src="item.cover"></div>
            <div class="col-8">
              <p class="row cenTit ellipsis">{{item.name}}<p>
              <div class="row cenMoney">
                <span class="timeBox col-8">{{item.time | time}}</span>
                <q-btn class="col-4" @click="startPage(item.source)">插入广告</q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-pull-to-refresh>
  </q-infinite-scroll>
</template>

<script>
import timeStamp from 'time-stamp'
export default {
  filters: {
    time (value) {
      return timeStamp.utc('YYYY-MM-DD HH:mm', new Date(value * 1000))
    }
  },
  data () {
    return {
      page: 1,
      listInfo: [],
      loadings: false
    }
  },
  methods: {
    getData (page, done) {
      if (this.loadings) {
        return void 0
      }
      this.loadings = true
      this.$http.getHotRecommend(this.$route.params.category, this.page, ({ errcode, data, message }) => {
        this.loadings = false
        if (typeof done === 'function') done()
        if (errcode === 0) {
          this.page += 1
          this.listInfo = this.listInfo.concat(data)
        }
      }).catch(e => {
        this.loadings = false
        if (typeof done === 'function') done()
      })
    },
    refresh (done) {
      this.page = 1
      this.listInfo = []
      this.getData(1, done)
    },
    startPage (link) {
      this.$router.push({ path: '/taskpreview', query: { link: link } })
    }
  },
  watch: {
    '$route.params.category' (nv, ov) {
      this.refresh()
    }
  }
}
</script>
