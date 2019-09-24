<style scoped lang="less">
  .item{
    width: 100%;
    padding: 25px 15px 20px;
    margin-top: 5px;
    background: #fff;
    .topBox{
      font-size: 12px;
      .topTime{
        color: #999;
      }
      .topStatus{
        color: rgb(255,133,58);
        text-align: right;
      }
    }
    .cenBox{
      padding-top: 15px;
      .cenImgBox{
        width: 60px;
        height: 60px;
        float: left;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 15px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .cenTit{
        font-size: 14px;
        color: #333;
        padding-top: 5px;
        opacity: 1;
      }
      .cenMoney{
        margin-top: 25px;
        font-size: 12px;
        color: #333;
        span{
          color: rgb(255,90,61);
        }
      }
    }
    >.items-end{
      margin-top: 30px;
      .q-btn{
        width:70px;
        height: 28px;
        margin-left: 15px;
        font-size: 12px;
        color:#999;
        border-radius: 3px;
        border: 1px solid #999;
      }
    }
  }
</style>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="animated fadeIn">
        <q-infinite-scroll ref="listScoll" @load="getData" :offset="250">
          <q-pull-to-refresh @refresh="refresh">
            <div class="row item" v-for="item in listInfo" :key="item.source" >
              <div class="row col-12 cenBox">
<!--                <div class="cenImgBox"><img :src="dataInfo.cover"></div>-->
                <q-item-section>
                  <q-item-label class="cenTit ellipsis">{{item.name}}</q-item-label>
                  <q-item-label class="cenMoney" >{{item.time | time}}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn class="bg-primary text-white cenMoney" @click="startPage(item.source)">插入广告</q-btn>
                </q-item-section>
              </div>
            </div>
          </q-pull-to-refresh>
        </q-infinite-scroll>
        <q-page-scroller position="bottom-right" :scroll-offset="250" :offset="[18, 18]">
          <q-btn class="toTop" fab icon="keyboard_arrow_up" color="primary"></q-btn>
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
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
      listInfo: [],
      loadings: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.loadings) {
        return void 0
      }
      this.loadings = true
      this.$http.getHotRecommend(this.$route.params.category, this.page, ({ errcode, data, message }) => {
        this.loadings = false
        if (errcode === 0) {
          this.page += 1
          this.listInfo = this.listInfo.concat(data)
        }
      }).catch(e => (this.loadings = false))
    },
    refresh (done) {
      this.page = 0
      this.listInfo = []
      this.getData()
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
