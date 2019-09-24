<style scoped lang="less">
.tzBox{
  padding: 20px 15px;
  background-color: #fff;
  .col-4{
    text-align: center;
    a{
      color: #333;
      font-size: 13px;
      img{
        width: 45px;
        height: 45px;
        margin-bottom: 8px;
      }
    }
  }
}
.itemBox{
  padding-top: 15px;
  .row{
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
        font-size: 15px;
        color:#333;
        padding-top: 3px;
      }
      .last-message{
        margin-top: 8px;
        margin-bottom: 13px;
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
  <layout-header class="notification animated fadeIn">
    <template slot="title">消息</template>
    <!-- 右侧 -->
    <!-- <template slot="right">
      <Badge dot :count="fansUnRead">
        <q-btn-dropdown icon="more_vert" flat dense round>
          <q-list>
            <q-item dense style="border-bottom:1px solid #ccc;">
              <q-btn to="/message/fans" dense flat size="xs" icon="access_time">
                <Badge :count="fansUnRead">
                  <span>粉丝消息</span>
                </Badge>
              </q-btn>
            </q-item>
            <q-item dense>
              <q-btn dense flat size="xs" icon="supervisor_account">通讯录</q-btn>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </Badge>
    </template> -->
    <!-- 通知栏 -->
    <van-sticky :offset-top="50">
    <div class="row tzBox">
      <div class="col-4">
        <router-link to="/task-notice">
          <img src="../../statics/message/tz.png" alt="">
          <p>通知</p>
        </router-link>
      </div>
      <div class="col-4">
        <router-link to="/notice/kefu">
          <img src="../../statics/message/kf.png" alt="">
          <p>客服</p>
        </router-link>
      </div>
      <div class="col-4">
        <router-link to="/notice/gg">
          <img src="../../statics/message/gg.png" alt="">
          <p>公告</p>
        </router-link>
      </div>
    </div>
    <div class="line"></div>
    </van-sticky>
    <q-pull-to-refresh @refresh="refresh" ref="pull">
      <q-list>
        <div class="itemBox">
          <div class="row" v-for="(item, index) in chats" :key="index" @click="toDetail(item)">
            <!-- 左 头像 -->
            <div class="col-2 avatarBox">
<!--              <q-avatar color="primary" text-color="white" :icon="item.avatar|convertToIcon">-->
              <q-avatar>
                <img :src="item.avatar || 'statics/user/avatar.png'" alt="">
                <q-badge floating v-if="item.unread>0" round>{{item.unread}}</q-badge>
              </q-avatar>
              <img class="imgQy" src="statics/TaskHall/qiye.png" v-if="item.type === 3"/>
            </div>
            <!-- 右 内容 -->
            <div class="col-10 btBorder">
              <p class="name">{{item|toName}}</p>
              <p caption lines="1" class="last-message">{{item.lastMessage|toString}}</p>
            </div>
          </div>
        </div>
      </q-list>
    </q-pull-to-refresh>
  </layout-header>
</template>
<script>
import deepcopy from 'deepcopy'
import { mapState, mapGetters, mapActions } from 'vuex'
import LayoutHeader from 'pages/Layout-header'
import MessageViewer, { MsgTypes } from './display-components'
export default {
  components: { LayoutHeader },
  data () {
    return {
      loaded: false,
      loading: false,
      chats_more: true,
      fansUnRead: 10
    }
  },
  computed: {
    ...mapGetters(['sessions', 'page', 'hasCache', 'info']),
    ...mapState({
      chats_raw: state => state.message.sessions
    }),
    runLoad () {
      return (!this.hasCache || !this.chats_raw.length) && !this.loaded
    },
    chats () {
      return deepcopy(this.chats_raw).map(item => {
        let members = Object.assign({}, ...item.members.map(m => {
          return { [m.uid]: m }
        }))
        item.messages.some(message => {
          if (members[message.from_uid]) {
            item.lastMessage = {
              nickname: (members[message.from_uid].talk_nickname || members[message.from_uid].nickname) + ': ',
              content: message.content,
              type: message.type
            }
            return true
          }
        })
        return item
      })
    }
  },
  filters: {
    convertToIcon (url) {
      return 'img:' + url
    },
    toName (item) {
      switch (item.type) {
        case 3:
        case 1: return item.members[0].talk_nickname || item.members[0].nickname
        case 2: return item.title || `群聊（${item.members.slice(0, 5).map(m => m.talk_nickname || m.nickname).join('、')}）`
      }
    },
    toString: message => {
      if (!message || !MsgTypes[message.type]) return ''
      return message.nickname + MessageViewer[MsgTypes[message.type]].methods.toString(message.content)
    }
  },
  mounted () {
    if (this.runLoad) this.$refs.pull.trigger()
  },
  methods: {
    ...mapActions([
      'setCurrentSession',
      'resetSessionList',
      'pushSessionList',
      'pageSetInc',
      'resetPage'
    ]),
    refresh (done) {
      this.resetPage()
      this.chats_more = true
      this.getSessions(this.page, true).then(done)
    },
    getSessions (page, reset = false) {
      return new Promise(resolve => {
        if (this.loading) return void resolve()
        if (!this.chats_more) return void resolve()
        this.loading = true
        this.$http.getMessageSession(page, ({ errcode, data, message }) => {
          this.loading = false
          if (errcode === 0) {
            this.pageSetInc()
            this.chats_more = data.more
            if (reset) {
              this.resetSessionList({
                uid: this.info.id,
                sessions: data.list
              })
            } else this.pushSessionList(data.list)
            if (this.chats_more) {
              this.getSessions(this.page).then(resolve)
            } else resolve()
          } else {
            resolve()
            this.$Message.error(message || '网络错误，请重试')
          }
        }).catch(e => {
          this.loading = false
          resolve()
        })
      })
    },
    toDetail (item) {
      this.$router.push(`/message/${item.id}`)
    }
  }
}
</script>
