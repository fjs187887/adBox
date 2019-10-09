<style scoped lang="less">
/deep/body.mobile .q-tabs__content{
  overflow: unset!important;
}
/deep/.q-tab__content{
  min-width: 0!important;
}
/deep/.footerTabs{
  overflow: unset!important;
}
/deep/.q-tabs>div{
  overflow: unset!important;
}
/deep/.index-bottom-sheet .q-item{
  width: 45%;
  margin: 0 auto;
}
/deep/.index-bottom-sheet .q-item__section--avatar{
  min-width: 0;
  padding-right: 0;
}
/deep/.index-bottom-sheet img{
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border-radius: 50%;
}
.q-footer{
  z-index: 5000;
  background-color: #fff;
}
.q-tabs{
  height: 50px;
  color:#000;
  overflow: unset!important;
}
.q-tab,.fb{
  padding:0;
  flex: 1;
  width:20%;
  opacity: 1;
}
.q-tab img,.fb .kong{
  height: 17px;
  width: 17px;
  margin-top: 3px;
}
.q-tab span,.fb span{
  text-align: center;
  width:100%;
  line-height: 1;
  font-size: 11px;
  padding-top: 7px;
}
.fb{
  height: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  background: #fff;
}
.fb .fTop{
  position: absolute;
  top: -20px;
  width: 50px;
  height: 50px;
  z-index:9999;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  border-radius: 50%;
  padding: 5px;
}
.fTop.on{
  border-top: 1px solid transparent;
}
.fTop img{
  width: 100%;
  transition: all .2s;
}
.fTop.on img{
  transform: rotate(45deg);
}
.q-tab.on .img1{display: none!important;}
.q-tab.on .img2{display: block!important;}
.q-tab .img1{display: block;}
.q-tab .img2{display: none;}
a:hover,a:active{
  color: #000;
}
.kBottom{
  height: 73px;
  width: 100%;
  background: #fff;
  position: relative;
  bottom: 0;
  z-index: 1;
}
.fbBox{
  position: fixed;
  /* bottom: -1000px; */
  bottom: 0px;
  left: 0;
  top:0;
  right: 0;
  z-index: 4999;
  opacity: 1;
  /* transition: all .5s; */
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,.9);
}
.fbBox .fbBoxContent{
  position: relative;
  width:100%;
  height: 100%;
}
.fbBox .fbBoxContent .imgBox{
  position: absolute;
  bottom: 67px;
  left: 50%;
  margin-left: -20px;
  width: 140px;
  height: 200px;
}
.imgItem{
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #333;
}
.imgItem span{
  font-size: 12px;
  margin-top: 2px;
  margin-left: 10px;
}
.fbBox .fbBoxContent img{
  width: 40px;
  height: 40px;
}
/* 弹窗2 */
.textSpan{
  position: relative;
  display: block;
  padding: 40px;
  text-align: center;
  font-size: 13px;
  color:#333;
}
.cardBtn{
  padding: 5px 0;
}
.cardBtn .q-btn{
  font-size: 13px;
  font-weight:normal;
  margin-left: 0!important;
}
</style>

<template>
  <q-layout class="pageZindex" view="lHh Lpr lFf">
    <q-header class="btBorder" v-if="$slots.left||$slots.title||$slots.right||title||leftComponent||rightComponent">
      <q-toolbar q-toolbar class="header-tool">
        <div class=" leftTit btn-space">
          <slot name="left">
            <component ref="leftComponent"
                       :is="leftComponent.component"
                       v-if="leftComponent"
                       v-on="leftComponent.on"
                       v-bind="leftComponent.props"/>
          </slot>
        </div>
        <q-toolbar-title class="cenTit text-center">
          <slot name="title">{{title}}</slot>
        </q-toolbar-title>
        <div class="rigTit btn-space">
          <slot name="right">
            <component ref="rightComponent"
                       :is="rightComponent.component"
                       v-if="rightComponent"
                       v-on="rightComponent.on"
                       v-bind="rightComponent.props"/>
          </slot>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container style=""><router-view ref="view"/></q-page-container>
    <q-footer class="topBorder">
      <q-tabs class="footerTabs" indicator-color="transparent" active-color="primary">
        <q-route-tab active-class="on" replace to="/task/">
          <img class="img1" src="statics/footer/rw.png" alt="">
          <img class="img2" src="statics/footer/rw2.png" alt="">
          <span>任务</span>
        </q-route-tab>
        <q-route-tab active-class="on" replace to="/business">
          <img class="img1" src="statics/footer/fws.png" alt="">
          <img class="img2" src="statics/footer/fws2.png" alt="">
          <span>商家号</span>
        </q-route-tab>
        <div class="fb topBorder" @click="show()">
          <div :class="isDeg ? 'on' : ''" class="fTop">
            <img src="statics/footer/fb2.png" alt="">
          </div>
          <div class="kong"></div>
          <span>发布</span>
        </div>
        <q-route-tab active-class="on" replace to="/message">
          <img class="img1" src="statics/footer/xx.png" alt="">
          <img class="img2" src="statics/footer/xx2.png" alt="">
          <span>消息</span>
        <q-badge color="red" floating v-if="MessageUnRead">{{MessageUnRead}}</q-badge>
        </q-route-tab>
        <q-route-tab active-class="on" replace to="/user">
          <img class="img1" src="statics/footer/wd.png" alt="">
          <img class="img2" src="statics/footer/wd2.png" alt="">
          <span>我的</span>
        </q-route-tab>
      </q-tabs>
      <!-- 弹框 -->
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="300">
      <div v-show="isShow" @click="show" class="fbBox">
        <div class="fbBoxContent">
          <div class="imgBox">
            <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
              <div style="animation-delay:200ms" v-show="isShow" class="imgItem" @click="startPage('/releasetask')">
                <img src="statics/release/task.png" alt="">
                <span >分享广告</span>
              </div>
            </transition>
            <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
              <div style="animation-delay:100ms" v-show="isShow" class="imgItem" @click="startPage('/releasetaskmini')">
                <img src="statics/release/hot_article.png" alt="">
                <span >小任务</span>
              </div>
            </transition>
            <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
              <div style="animation-delay:0ms" v-show="isShow" class="imgItem" @click="startPage('/textrecommend')">
                <img src="statics/release/mini_task.png" alt="">
                <span >热文植入</span>
              </div>
            </transition>
          </div>
        </div>
      </div>
      </transition>
      <!-- 弹窗2 -->
      <q-dialog v-model="confirm" persistent>
        <q-card class="no-shadow">
          <span class="textSpan btBorder">您是未认证用户,请前往认证</span>
          <q-card-actions class="row cardBtn" align="center">
            <q-btn class="col-6" flat label="取消" color="gray" v-close-popup />
            <q-btn class="col-6 leBorder" flat label="去认证" @click="toRz('/Attestation/index')" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutHeader from './Layout-header'
export default {
  extends: LayoutHeader,
  data () {
    return {
      isShow: false,
      isDeg: false,
      confirm: false,
      userInfo: '',
      title: false
    }
  },
  computed: {
    ...mapGetters({
      MessageUnRead: 'unread'
    })
  },
  methods: {
    init () {
      if (this.$refs.view) {
        this.setTitle(this.$refs.view.title)
        this.registerLeftComponent(false)
        this.registerRightComponent(false)
        this.registerFooterComponent(false)
        this.setStyle(this.$refs.view.style || {})
      }
    },
    show () {
      this.isShow = !this.isShow
      this.isDeg = !this.isDeg
      this.userCenter()
    },
    startPage (url) {
      if (!this.userInfo) {
        this.confirm = !this.confirm
        return
      }
      if (this.userInfo.audit_status === 2) {
        if (url === '/textrecommend' && !this.userInfo.role_permission) {
          url = '/taskmain'
        }
        this.$router.push(url)
      } else {
        this.confirm = !this.confirm
      }
    },
    toRz (value) {
      this.$router.push(value)
    },

    userCenter () {
      this.$http.checksta(data => {
        if (data.code === 0 && data.data.data) {
          this.userInfo = data.data.data
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
