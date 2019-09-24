<style scoped lang="less">
#q-app {
  > .ws-state{
    position: fixed;
    z-index: 999;
    background: #fff;
    bottom: 100px; right: 5px;
    > *{
      padding-bottom: 8px;
      &:last-child{
        padding-bottom:0;
      }
    }
  }
}
</style>
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { CallAppSDK } from 'src/boot/app-sdk'
export default {
  name: 'App',
  mounted () {
    if (!this.logined) {
      CallAppSDK('getActFromNative').then(([uid, token]) => {
        if (uid && token) {
          this.$http.login({
            type: `auto-login|${uid}`,
            data: token
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters(['logined', 'WS_online', 'WS_logined']),
    ...mapState({ ws_connecting: state => state.websocket.ws_connecting })
  },
  methods: {
    ws_connect () {
      this.$ws.ws.getWsInstance().then(() => {
        this.$ws.init()
      }).catch(e => {
        this.$Message.error('连接失败，请检查您的网络是否通畅。')
      })
    },
    ws_login () {
      if (this.logined) {
        this.$ws.init()
      } else this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
