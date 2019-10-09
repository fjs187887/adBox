<style scoped lang="less">
.tzBox{
  padding: 20px 15px;
  background-color: #fff;
  .tzbox-item{
    flex:1;
    text-align: center;
    a{
      color: #333;
      font-size: 13px;
      img{
        overflow:hidden;
        margin-bottom: 8px;
        border-radius: 50%;
        width: 45px; height: 45px;
      }
    }
  }
}
.topbar-box{
  top:50px;
  z-index:1;
  width:100%;
  position:fixed;
  background-color:#fff;
}
.q-list{
  min-height:40vh;
}
.ivu-alert{
  border-radius:0;
  margin-bottom: 0;
  border-width: 1px 0;
}
.itemBox{
  padding-top: 15px;
  .row{
    position: relative;
    padding: 12px 15px;
    .avatarBox{
      position: relative;
      .q-avatar{
        width: 45px;
        height: 45px;
      }
      .imgQy{
        width: 30px;
        position: absolute;
        bottom: 0px;
        left: 7.5px;
      }
    }
    .col-10{
      min-height: 51px;
      position: relative;
      .name{
        font-size: 13px;
        color:#333;
        padding-top: 3px;
      }
      .last-message{
        margin-top: 13px;
        margin-bottom: 8px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .btBorder::after{
    left: unset!important;
  }
}
</style>

<template>
  <div class="container">
    <div :style="topBarHeight">
      <div class="topbar-box">
        <Row class="tzBox" type="flex">
          <i-col class="tzbox-item" v-for="(session, index) in systemSessions" :key="index">
            <router-link v-if="session.controller" :to="session.controller">
              <img :src="session.avatar|toSource">
              <p>{{session.title}}</p>
            </router-link>
            <router-link :to="'/message/system/'+session.id" v-else>
              <img :src="session.avatar|toSource">
              <p>{{session.title}}</p>
            </router-link>
          </i-col>
          <i-col class="tzbox-item">
            <router-link to="/message/fans">
              <img src="../../statics/Hot/xflb.png">
              <p>粉丝</p>
            </router-link>
          </i-col>
        </Row>
        <div class="line" v-if="WsConnected"></div>
        <Alert type="error" v-else>
          <span v-if="WsConnecting">正在连接消息服务</span>
          <span v-else @click="WSConnect">您已断开与消息服务断开链接，点击重连。</span>
        </Alert>
      </div>
    </div>
    <q-pull-to-refresh @refresh="refresh" ref="pull">
      <q-list>
        <div class="itemBox">
          <div class="row" v-for="(item, index) in sessionsArray" :key="index" @click="toDetail(item)">
            <div class="col-2 avatarBox">
              <avatar :src="item|toAvatar(info.id)">
                <q-badge floating v-if="item.unread>0" round>{{item.unread}}</q-badge>
              </avatar>
              <img class="imgQy" src="statics/TaskHall/qiye.png" v-if="item.type === 3"/>
            </div>
            <div class="col-10 btBorder">
              <p class="name text-ellipsis">{{item|toName}}</p>
              <p caption lines="1" class="last-message text-ellipsis">{{item.messages|toText(item.members)}}</p>
            </div>
          </div>
        </div>
      </q-list>
    </q-pull-to-refresh>
  </div>
</template>
<script>
import {
  mapState,
  mapGetters,
  mapActions } from 'vuex'
import filters from './filters'
import avatar from 'src/components/avatar'

export default {
  filters,
  components: { avatar },
  data () {
    return {
      title: '消息',
      loaded: false,
      loading: false,
      chats_more: true,
      fansUnRead: 10
    }
  },
  computed: {
    ...mapState({ sessionsArray: state => state.message.sessions }),
    ...mapGetters(['sessions', 'systemSessions', 'hasCache', 'info', 'WsConnected', 'WsConnecting']),
    topBarHeight () {
      return {
        height: this.WsConnected ? '112px' : '140px'
      }
    },
    runLoad () {
      return (!this.hasCache || !this.sessionsArray.length) && !this.loaded
    }
  },
  mounted () {
    if (this.runLoad) this.$refs.pull.trigger()
  },
  methods: {
    ...mapActions(['setSessionList', 'pushSessionList', 'clearSessionUnread', 'resetSendingMessage']),
    refresh (done) {
      this.chats_more = true
      this.getSessions(1, done)
      this.getSystemSession(done)
    },
    getSystemSession (done) {
      this.$http.getSystemSession(() => done())
    },
    getSessions (page, done) {
      if (this.loading || !this.chats_more) {
        return void 0
      }
      this.loading = true
      this.$http.getMessageSession(page, ({ errcode, data, message }) => {
        if (errcode === 0) {
          if (page === 1) {
            this.setSessionList({
              uid: this.info.id,
              sessions: data.list
            })
            this.resetSendingMessage()
          } else this.pushSessionList(data.list)
          done(!(this.chats_more = data.more))
        } else {
          this.$toast(message || '网络错误，请重试')
          done()
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
        this.$toast.error('加载失败')
        done(true)
      })
    },
    WSConnect () {
      this.$ws.connect()
    },
    toDetail (item) {
      this.$router.push(`/message/${item.id}`)
    }
  }
}
</script>
