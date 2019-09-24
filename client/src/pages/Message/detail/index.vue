<style scoped lang="less">
  .content{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 15px 15px 0;
    box-sizing:border-box;
    .q-pull-to-refresh{
      min-height: 100%;
      .q-message{
        /deep/ .q-message-container{
          .q-message-avatar{
            overflow:hidden;
            width:48px; height:48px;
            background-color: #f1f1f1;
          }
          .q-message-name{
            padding:0 0 2px 0;
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
    <div class="loading" align="center" v-show="loading">
      <q-spinner-hourglass color="primary" size="2em"/>
    </div>
    <q-pull-to-refresh @refresh="load" ref="sc">
      <q-chat-message v-for="(item, index) in chatItems" :key="index" ref="chats"
                      text-sanitize
                      name-sanitize
                      :sent="isOwn(item.from_uid)"
                      :name="getName(item.from_uid)"
                      :stamp="item.create_time|time"
                      :avatar="getAvatar(item.from_uid) || 'statics/user/avatar.png'"
      >
        <component :is="item.type|ViewType" :message="item" :index="index"></component>
      </q-chat-message>
    </q-pull-to-refresh>
  </div>
</template>
<script>
import uuid from 'uuid/v1'
import deepcopy from 'deepcopy'
import timestamp from 'time-stamp'
import { mapState, mapGetters, mapActions } from 'vuex'
import MsgViewer, {
  MsgTypes, DefaultType
} from '../display-components/index'
import sendBox from './send-box'
import right from './right-btn'
export default {
  components: MsgViewer,
  inject: ['setTitle', 'registerRightComponent', 'registerFooterComponent'],
  data () {
    return {
      more: true,
      lastId: null,
      loading: false,
      targetUid: this.$route.params.uid,
      style: {
        height: '100vh'
      }
    }
  },
  computed: {
    ...mapGetters({
      hasCache: 'hasCache',
      showNickname: 'showNickname',
      session: 'currentSession',
      chatItems: 'currentSessionMessage',
      chatMembers: 'currentSessionMembers'
    }),
    ...mapState({
      user: state => state.user.info,
      clearUnread: state => state.message.outClear
    }),
    title () {
      if (this.session) {
        let members = Object.values(this.chatMembers)
        if (this.session.title) return this.session.title
        else if (members.length > 1) return `群聊(${members.map(item => item.talk_nickname || item.nickname).join('、')})`
        else if (members.length === 1) return members[0].talk_nickname || members[0].nickname
      }
      return this.loading ? '加载中' : '消息详情'
    },
    sid () {
      return this.$route.params.sid
    },
    uid () {
      return this.$route.params.uid
    }
  },
  filters: {
    time: datetime => {
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
    ...mapActions(['pushSessionNew', 'setCurrentSession', 'unsetCurrentSession', 'clearCurrentSessionUnread', 'pushCurrentSessionMessage']),
    load (done) {},
    send (message) {
      let send = {
        session_id: this.session.id,
        from_uid: this.user.id,
        uuid: uuid(),
        ...message
      }
      let push = {
        state: 0,
        create_time: timestamp('YYYY-MM-DD HH:mm:ss'),
        ...deepcopy(send)
      }
      this.pushCurrentSessionMessage({ isNew: true, message: push })
      this.$ws.sendMessage(send)
      // .then(() => this.$set(push, 'state', 2))
      // .catch(e => this.$set(push, 'state', 1))
    },
    resend (message) {

    },
    initSession () {
      this.loading = true
      this.registerRightComponent({ component: right })
      this.registerFooterComponent({
        component: sendBox,
        on: { send: message => this.send(message) }
      })
      new Promise((resolve, reject) => {
        if (this.sid) {
          this.setCurrentSession({ id: this.sid })
          if (!this.session) {
            this.$http.getMessageSessionById(this.sid, ({ errcode, data, message }) => {
              if (errcode === 0) {
                if (data) {
                  this.pushSessionNew(data)
                  this.setCurrentSession({ id: data.id })
                  resolve(data.id)
                } else reject()
              } else this.$Message.error(message || '网络错误')
            }).catch(e => reject(e))
          } else resolve(this.sid)
        } else if (this.uid) {
          this.$http.startMessageSession(this.uid, ({ errcode, data, message }) => {
            if (errcode === 0) {
              this.pushSessionNew(data)
              this.setCurrentSession({ id: data.id })
              resolve(data.id)
            } else reject(message)
          }).catch(e => reject(e))
        } else reject()
      }).then(e => {
        this.loading = false
        this.toBottom()
      }).catch(e => {
        this.loading = false
        this.$router.back()
        this.$Message.error('无效的会话')
      })
    },

    isOwn (uid) {
      return this.user.id === uid
    },
    getName (uid) {
      if (!this.showNickname) return ''
      if (this.isOwn(uid)) {
        return this.user.nickname
      } else {
        return this.chatMembers[uid] && (this.chatMembers[uid].talk_nickname || this.chatMembers[uid].nickname)
      }
    },
    getAvatar (uid) {
      if (this.isOwn(uid)) {
        return this.user.avatar
      } else return this.chatMembers[uid] && this.chatMembers[uid].avatar
    },

    toBottom () {
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.$refs.chats && this.$refs.chats.length) {
            this.$refs.chats[this.$refs.chats.length - 1].$el.scrollIntoView()
          }
          // this.$refs.content.scrollTop = this.$refs.content.scrollHeight
        })
      })
    }
  },
  watch: {
    title (nv) {
      this.setTitle(nv)
    },
    chatItems () {
      this.toBottom()
    },
    'session.id' (nv) {
      this.clearCurrentSessionUnread()
      this.$http.clearMessageUnread(nv)
    },
    $route () {
      this.initSession()
    }
  },
  mounted () {
    this.initSession()
    this.toBottom()
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
