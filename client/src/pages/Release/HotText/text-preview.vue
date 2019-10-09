<style scoped lang="less">
// 顶部
.top-ad /deep/ .ivu-row-flex {
  top:50px;
}
// 内容
.hot-container{
  padding: 10px 15px 0;
}
.body.loading{
  padding: 20px;
}
// 底部广告
.bottom-ad{
  height: 100px;
  > div {
    width:100%;
    position:fixed;
    bottom: 0; left: 0;
  }
  .setting{
    @height:30px;
    height:@height;
    display: flex;
    align-items: center;
    padding: 0 15px;
    overflow:hidden;
    font-size: 12px!important;
    font-weight: normal;
    color:#ff853a;
    background-color:#fff;
    /deep/.ivu-row:after{
      visibility: unset!important;
    }
    .q-btn,
    /deep/.q-checkbox__label{
      font-size: 12px!important;
      font-weight: normal;
      color:#ff853a;
    }
    /deep/ .q-checkbox__inner{
      width:@height;
      height:@height;
      min-width:@height;
      padding: 0;
      .q-checkbox__bg{
        color: #ff853a;
        top: 7px;
        height: 14px;
        width: 14px;
      }
    }
  }
  .add-ad{
    height: 60px;
    color:#fff;
    display:flex;
    font-size:18px;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    .q-btn{
      background: #f0f0f0;
      font-size: 13px;
      font-weight: normal;
      color: #666;
    }
  }
}
// 发布按钮
.fixBox{
  position: fixed;
  right: 20px;
  top:70%;
  width: 105px;
  min-width: 50px;
  z-index: 201;
  .ite{
    display: flex;
    height: 50px;
    align-items: center;
    span{display: none;}
    >img{
      position: absolute;
      right: 0;
      width: 50px;
      right: -2px;
      transition: all .2s;
      transform: rotate(45deg);
    }
  }
  .hideBox{display: none;}
}
// 发布按钮2
.on{
  .imgItem.ite{
    display: flex;
    align-items: center;
    .qx{display: inline-block;}
    img{transform: rotate(0);}
  }
  .hideBox{
    position: absolute;
    top: -150px;
    display: block;
    width: 120px;
    right: 0;
    .imgItem{
      display: flex;
      align-items: center;
      margin-top: 20px;
      color: #333;
      justify-content: flex-end;
      span{
        font-size: 12px;
        margin-right: 10px;
      }
      img{
        width: 45px;
        height: 45px;
      }
    }
  }
}
.fbBox{
  position: fixed;
  bottom: 0px;
  left: 0;
  top:0;
  right: 0;
  z-index: 200;
  opacity: 1;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,.9);
}
</style>
<template>
  <q-layout>
    <!-- 顶部广告 -->
    <top-ad :show.sync="form.show_top" :allow-close="HotVip"/>
    <!-- 文章内容 -->
    <div class="hot-container" v-if="HotContent">
      <link rel="stylesheet" :href="HotContent.extra_style" v-if="HotContent.extra_style"/>
      <div class="title">{{HotContent.title}}</div>
      <div class="media_meta" v-if="HotContent.author || HotContent.source_time">
        <a class="author_name" href="javascript:;">{{HotContent.author}}</a>
        <span class="publish_time">{{HotContent.source_time}}</span>
      </div>
      <div v-html="HotContent.content"></div>
    </div>
    <div class="body loading" v-else><loading center="center"/></div>
    <!-- 广告 -->
    <div class="bottom-ad">
      <div>
        <Row class="setting btBorder">
          <i-col span="12" class="text-left">
            <q-btn dense flat size="md" @click="this.selectAd" :disabled="publishing">广告模板</q-btn>
          </i-col>
          <i-col span="12" class="text-right">
            <q-checkbox color="blue" v-model="form.bottom_float" label="悬浮展示"/>
          </i-col>
        </Row>
        <bottom-ad :fixed="false" :ads="form.ads" v-if="form.ads.length"/>
        <div class="ad-list" v-else>
          <div class="ad add-ad">
            <q-btn flat @click="selectAd" class="full-width" :disabled="publishing">添加底部广告</q-btn>
          </div>
        </div>
      </div>
    </div>
    <!-- isDeg 图片旋转 isShow 白色遮罩层 -->
    <div :class="isDeg ? 'on' : ''" class="fixBox" @click="clickOpen">
      <div class="imgItem ite">
        <span class="qx">取消发布</span>
        <img src="statics/Hot/fbqx.png" alt="">
      </div>
      <!-- 隐藏盒子 -->
      <div class="hideBox">
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
          <div style="animation-delay:200ms" v-show="isShow" class="imgItem" @click="publish">
            <span >发布任务</span>
            <img src="statics/Hot/fbrw.png" alt="">
          </div>
        </transition>
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
          <div style="animation-delay:100ms" v-show="isShow" class="imgItem" @click="share">
            <span >立即分享</span>
            <img src="statics/Hot/ljfx.png" alt="">
          </div>
        </transition>
      </div>
    </div>
    <!-- 遮罩 -->
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="300">
      <div v-show="isShow" @click="isShow = false" class="fbBox"></div>
    </transition>
    <!-- 原 弹框 -->
    <select-ad v-model="form.ads" ref="adModal"/>
    <Modal v-model="open" :closable="false" :mask-closable="false" title="推广热文" footer-hide>
      <Row class="text-center">
        <i-col span="8">
          <q-btn @click="share">立即分享</q-btn>
        </i-col>
        <i-col span="8">
          <q-btn @click="toTask">发布任务</q-btn>
        </i-col>
        <i-col span="8">
          <q-btn to="/myhot">暂不操作</q-btn>
        </i-col>
      </Row>
    </Modal>
  </q-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import loading from 'src/components/loading'
import selectAd from 'src/components/select-ad'
import topAd from 'src/components/select-ad/ad-box/top'
import bottomAd from 'src/components/select-ad/ad-box/bottom'

export default {
  inject: ['setTitle'],
  components: { loading, selectAd, topAd, bottomAd },
  data () {
    return {
      onad: 0,
      isShow: false, // 罩层
      isDeg: false, // 旋转
      open: false,
      title: '热文详情',
      shareLink: null,
      HotContent: null,
      publishing: false,
      agreeEmpty: false,
      openSelectAd: false,
      form: {
        show_top: true,
        show_bottom: true,
        bottom_float: true,
        ads: []
      }
    }
  },
  computed: mapGetters(['HotVip']),
  created () {
    let link = this.$route.query.link
    if (link) {
      this.$http.getHotContent(link, ({ errcode, data, message }) => {
        if (errcode === 0) {
          this.HotContent = data
          this.setTitle(data.title)
        } else this.$toast.fail(message || '加载失败')
      }).catch(e => {
        this.$toast.fail('加载失败')
      })
    } else this.$router.back()
  },
  methods: {
    clickOpen () {
      this.isShow = !this.isShow
      this.isDeg = !this.isDeg
    },
    closeTop () {
      if (this.HotVip) this.form.show_top = false
      else {
        this.$toast({
          message: '关闭顶部广告需要开通热文推会员，您当前未开通。'
        })
      }
    },
    selectAd () {
      this.$refs.adModal.$open()
    },
    publish () {
      if (!this.publishing) {
        if ((!this.form.ads || this.form.ads.length === 0) && !this.agreeEmpty) {
          return this.$dialog.confirm({
            title: '提示',
            message: '您还未添加广告，是否仍然发布？'
          }).then(() => {
            this.agreeEmpty = true
            this.publish()
          }).catch(() => {
          })
        }
        this.publishing = true
        this.agreeEmpty = false
        this.$http.publishHot(this.HotContent.id, this.form, this.$route.query.type ? 1 : 2, ({ errcode, data, message }) => {
          this.publishing = false
          if (errcode === 0) {
            // 成功 open打开
            // this.open = true
            this.shareLink = data
            // toTask事件
            if (this.shareLink) {
              this.$router.push({
                path: '/releasetask',
                query: {
                  attach: true,
                  link: this.shareLink,
                  title: this.HotContent.title,
                  cover: this.HotContent.cover
                }
              })
            }
          } else if (errcode === 5002) {
            this.$toast({
              message: message,
              onClose: () => this.$router.push('/myhot')
            })
          } else this.$toast(message || '发送失败，请稍后重试')
        }).catch(e => {
          this.publishing = false
          this.$toast('发布失败，请检查网络是否正常')
        })
      }
    },
    toTask () {
    },
    share () {
      this.publish((link) => {
        this.$share(this.HotContent.title, this.HotContent.desc, this.HotContent.cover, link).then(result => {
          this.$router.push('/myhot')
        }).catch(e => {
          this.$router.push('/myhot')
        })
      })
    }
  }
}
</script>
