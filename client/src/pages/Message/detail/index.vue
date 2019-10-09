<style scoped lang="less">
  .content{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 15px 15px 0;
    box-sizing:border-box;
    .van-pull-refresh{
      min-height: 100%;
      .q-message{
        margin-bottom: 10px;
        @avatar-width: 48px;
        &.q-message-sent{
          padding-left: calc(@avatar-width + 8px)
        }
        &.q-message-received{
          padding-right:calc(@avatar-width + 8px)
        }
        /deep/ .q-message-container{
          .q-message-avatar{
            overflow:hidden;
            width:@avatar-width;
            height:@avatar-width;
            background-color: #f1f1f1;
          }
          .q-message-name{
            overflow:hidden;
            line-height:1.5em;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .q-message-stamp {
            opacity: .3;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="content" ref="content">
    <sticky :offset-top="45">
      <Alert type="error" v-if="!WsConnected">
        <span v-if="WsConnecting">正在连接消息服务</span>
        <span v-else @click="WSConnect">您已断开与消息服务断开链接，点击重连。</span>
      </Alert>
      <Alert v-else-if="!WsLogined">
        <span @click="wsLogin">当前未登录消息服务器，点击登录</span>
      </Alert>
    </sticky>
    <pull-refresh v-model="loading" @refresh="load" :head-height="loadMinLimit">
      <div slot="loosing" slot-scope="{distance}">
        <span v-if="distance>reloadMinLimit">释放刷新消息</span>
        <span v-else>释放加载消息</span>
      </div>
      <div class="loading" align="center" v-show="initing">
        <q-spinner-hourglass color="primary" size="2em"/>
      </div>
      <q-chat-message ref="chats" v-for="(item, index) in chatMessages" :key="index"
                      text-sanitize
                      name-sanitize
                      :sent="item.from_uid===user.id"
                      :stamp="item.create_time|toTime"
                      :name="item.from_uid|toName(showNickname, chatMembers)"
                      :avatar="item.from_uid|toAvatar(chatMembers)"
      >
        <component :is="item.type|ViewType" :message="item" :index="index"></component>
      </q-chat-message>
    </pull-refresh>
  </div>
</template>
<script>
import uuid from 'uuid/v1'
import deepcopy from 'deepcopy'
import timestamp from 'time-stamp'
import { Sticky } from 'vant'
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
import right from './right-btn'
import sendBox from './send-box'
import MsgViewer, {
  MsgTypes,
  DefaultType
} from '../display-components/index'
import pullRefresh from 'src/components/pull-refresh'
export default {
  components: { ...MsgViewer, pullRefresh, Sticky },
  inject: ['setTitle', 'registerRightComponent', 'registerFooterComponent'],
  data () {
    return {
      more: true,
      lastId: null,
      initing: false,
      loading: false,
      loadMinLimit: 35,
      reloadMinLimit: 80,
      sending: [],
      targetUid: this.$route.params.uid,
      style: {
        height: '100vh'
      }
    }
  },
  computed: {
    ...mapState({
      clearUnread: state => state.message.outClear
    }),
    ...mapGetters({
      WsLogined: 'WsLogined',
      WsConnected: 'WsConnected',
      WsConnecting: 'WsConnecting',
      user: 'info',
      showNickname: 'showNickname',
      session: 'currentSession',
      chatMembers: 'currentSessionMembers',
      chatMessages: 'currentSessionMessage'
    }),
    sid () {
      return this.$route.params.sid
    },
    uid () {
      return this.$route.params.uid
    },
    title () {
      if (this.session) {
        if (this.session.title) {
          return this.session.title
        }
        let members = this.session.members
        if (this.session.type === 2) {
          let name = members.slice(0, 4)
            .map(m => (m.talk_nickname || m.nickname || '')
              .replace(/^(\S{4})\S+$/, '$1...'))
            .join(',')
          return `群聊(${name})`
        }
        for (let i = 0; i < members.length; i++) {
          if (this.session.type === 1) {
            if (members[i].uid !== this.user.id) {
              return members[i].talk_nickname || members[i].nickname
            }
          } else if (this.session.type === 3) {
            if (members[i].uid === this.session.uid) {
              return members[i].talk_nickname || members[i].nickname
            }
          } else break
        }
      }
      return this.loading ? '加载中' : '消息详情'
    }
  },
  filters: {
    toName (uid, showNickname, members) {
      if (showNickname && members[uid]) {
        return members[uid].talk_nickname || members[uid].nickname
      }
    },
    toAvatar (uid, members) {
      if (members[uid]) {
        return members[uid].avatar
      }
    },
    toTime (datetime) {
      if (!/(^\d{4}(-\d{2}){2})\s((\d{2}:?){3})$/.test(datetime)) {
        return datetime
      }
      let today = new Date()
      let time = /\s((\d{2}:?){3})$/.exec(datetime)[1]
      let date = /(^\d{4}(-\d{2}){2})/.exec(datetime)[1]
      let [ dateYear, dateMonth, dateDay ] = date.split('-').map(i => Number(i))
      let [ timeHours, timeMinutes ] = time.split(':').map(i => Number(i))
      if (today.getFullYear() === dateYear) {
        if (today.getMonth() + 1 === dateMonth) {
          if (today.getDate() === dateDay) {
            if (timeHours === today.getHours()) {
              if (timeMinutes === today.getMinutes()) {
                return '刚刚'
              }
              return `${today.getMinutes() - timeMinutes}分钟前`
            }
            return time
          }
        }
        switch (today.getDate() - dateDay) {
          case 1: return `昨天 ${time}`
          case 2: return `前天 ${time}`
          default: return `${dateMonth}-${dateDay} ${time}`
        }
      }
      return datetime
    },
    ViewType: type => MsgTypes[type] || MsgTypes[DefaultType]
  },
  methods: {
    ...mapActions([
      'pushSessionList',
      'setCurrentSession',
      'unsetCurrentSession',
      'clearCurrentSessionUnread',
      'resetCurrentMessage',
      'pushCurrentSessionMessage',
      'pushSendingMessage',
      'resetSendingMessage'
    ]),
    load (distance) {
      if ((!this.more && distance < this.reloadMinLimit) || !this.session || distance < this.loadMinLimit) {
        // return void (this.loading = false)
      }
      this.lastId = distance > this.reloadMinLimit ? void 0 : this.chatMessages[0] && this.chatMessages[0].id
      this.$http.getMessages({
        prev: true,
        last: this.lastId,
        sid: this.session.id
      }, ({ errcode, data, message }) => {
        if (errcode === 0) {
          this.more = data.more
          if (this.lastId) {
            this.pushCurrentSessionMessage({
              message: data.list,
              prev: true
            })
          } else this.resetCurrentMessage(data.list)
        } else this.$Message.error(message || '加载失败，请检查网络设置')
        this.loading = false
      }).catch(e => (this.loading = false))
    },

    send (message) {
      let send = {
        session_id: this.session.id,
        from_uid: this.user.id,
        uuid: uuid(),
        ...message
      }
      this.pushSendingMessage({
        sid: this.session.id,
        message: {
          state: 0,
          create_time: timestamp('YYYY-MM-DD HH:mm:ss'),
          ...deepcopy(send)
        }
      })
      this.$ws.sendMessage(send)
    },
    resend (message) {

    },

    register () {
      this.registerRightComponent({ component: right })
      this.registerFooterComponent({
        component: sendBox,
        on: { send: message => this.send(message) }
      })
    },
    initSession () {
      this.initing = true
      new Promise((resolve, reject) => {
        if (this.sid) {
          this.setCurrentSession(this.sid)
          if (this.session) {
            return resolve()
          }
          this.$http.getMessageSessionById(this.sid, ({ errcode, data, message }) => {
            if (errcode === 0) {
              if (data) {
                this.pushSessionList(data)
                this.setCurrentSession(data.id)
                resolve(data.id)
              } else reject()
            } else this.$Message.error(message || '网络错误')
          }).catch(e => reject(e))
        } else if (this.uid) {
          this.$http.startMessageSession(this.uid, ({ errcode, data, message }) => {
            if (errcode === 0) {
              this.pushSessionList(data)
              this.$router.replace(`/message/${data.id}`)
            } else reject(message)
          }).catch(e => reject(e))
        } else reject()
      }).then(e => {
        this.initing = false
        this.toBottom()
      }).catch(e => {
        this.initing = false
        this.$router.back()
        this.$Message.error('无效的会话')
      })
    },

    toBottom () {
      this.$nextTick(() => {
        if (!this.lastId) {
          setTimeout(() => this.$refs.chats && this.$refs.chats.length && this.$refs.chats[this.$refs.chats.length - 1].$el.scrollIntoView(), 100)
        }
      })
    },
    WSConnect () {
      this.$ws.connect()
    },
    wsLogin () {
      this.$ws.login()
    }
  },
  watch: {
    title (nv) {
      this.setTitle(nv)
    },
    chatMessages () {
      this.toBottom()
    },
    'session.id' (nv) {
      this.clearCurrentSessionUnread()
      this.$http.clearMessageUnread(nv)
    },
    $route () {
      this.register()
      this.initSession()
    }
  },
  mounted () {
    this.register()
    this.initSession()
  },
  beforeDestroy () {
    if (this.clearUnread && this.session) {
      this.clearCurrentSessionUnread()
      this.$http.clearMessageUnread(this.session.id)
    }
    this.unsetCurrentSession()
  }
}
</script>
