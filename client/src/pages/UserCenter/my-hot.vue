<style scoped lang="less">
.statistics{
  font-size:13px;
  padding:20px 0;
  background: #ff853a;
  line-height: 1.75em;
  span{
    font-size: 15px;
    color: #fff;
  }
  p{
    font-size: 12px;
    color: #fff;
  }
}
.list{
  .item{
    .topBox{
      padding: 15px;
      .imgBox{
        width: 84px;
        height: 84px;
        border-radius: 3px;
        overflow: hidden;
        img{
          width: 100%;
          height:100%;
        }
      }
      .titBox{
        padding-left: 15px;
        padding-top: 3px;
        p{
          line-height: 20px;
          font-size: 14px;
          color:#333;
        }
        span{
          color: #999;
          font-size: 12px;
          display: block;
          margin-top: 45px;
        }
      }
    }
    .numBox{
      position: relative;
      margin: 0 15px;
      justify-content: center;
      align-items: center;
      height: 30px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="container">
    <q-card square flat>
      <Row class="statistics text-center">
        <i-col span="8">
          <span>{{statistics.read || 0}}</span>
          <p>总阅读数</p>
        </i-col>
        <i-col span="8">
          <span>{{statistics.click||0}}</span>
          <p>总点击数</p>
        </i-col>
        <i-col span="8">
          <span>{{statistics.forward||0}}</span>
          <p>总转发数</p>
        </i-col>
      </Row>
    </q-card>
    <div class="list">
      <q-infinite-scroll @load="getData" :offset="250" :disable="!hasMore">
        <q-pull-to-refresh @refresh="reload">
          <div class="item" v-for="hot in list" :key="hot.id">
            <div class="row topBox">
              <div class="col-4 imgBox">
                <img :src="hot.cover" :alt="hot.title">
              </div>
              <div class="col-8 titBox">
                <p class="ellipsis">{{hot.title}}</p>
                <span>发布时间：{{hot.create_time}}</span>
              </div>
            </div>
            <!-- 按钮 -->
            <div class="row">
              <!-- <p class="q-mb-sm"><q-btn dense size="sm" color="primary" @click="share(hot)">立即分享</q-btn></p> -->
              <!-- <p><q-btn dense size="sm" color="blue" @click="publishTask(hot)">发布任务</q-btn></p> -->
            </div>
            <div class="row numBox topBorder">
              <span class="col">阅读数：{{hot.read}}</span>
              <span class="col">点击数：{{hot.click}}</span>
              <span class="col">转发数：{{hot.forward}}</span>
            </div>
            <div class="line"></div>
          </div>
        </q-pull-to-refresh>
      </q-infinite-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      hasMore: true,
      loading: false,
      title: '我的热文',
      statistics: {},
      list: []
    }
  },
  created () {
    this.getStatistics()
  },
  methods: {
    reload (done) {
      this.getData(1, done)
    },
    getData (page, done) {
      if (!this.loading) {
        this.$http.getHotMyself(page, ({ errcode, data, message }) => {
          if (errcode === 0) {
            this.hasMore = data.has_more
            this.list = this.list.concat(data.list)
          } else this.$Message.error(message || '加载失败')
          typeof done === 'function' && done()
        }).catch(e => {
          this.loading = false
          this.$Message.error('加载失败')
          typeof done === 'function' && done()
        })
      }
    },
    getStatistics () {
      this.$http.getHotStatistics(({ errcode, data, message }) => {
        if (errcode === 0) {
          this.statistics = data
        }
      })
    },
    share (hot) {
      this.$share(hot.title, hot.resume || '', hot.cover, hot.link)
    },
    publishTask (hot) {
      this.$router.push({
        path: '/releasetask',
        query: {
          attach: true,
          link: hot.link,
          title: hot.title,
          cover: hot.cover
        }
      })
    }
  }
}
</script>
