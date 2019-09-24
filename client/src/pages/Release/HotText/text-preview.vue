<style scoped lang="less">
.hot-container{
  padding: 5px 16px;
  .top-ad{
    margin:0 10px 10px 0;
    .ivu-row-flex{
      height: 40px;
      padding:0 10px;
      line-height:40px;
      position: relative;
    }
  }
}
.body.loading{
  padding: 20px;
}
.bottom-ad{
  height: 100px;
  > div {
    width:100%;
    position:fixed;
    bottom: 0; left: 0;
  }
  .setting{
    @height:30px;
    color:#fff;
    height:@height;
    padding: 0 16px;
    overflow:hidden;
    background-color:rgba(0,0,0,.4);
    /deep/ .q-checkbox__inner{
      width:@height;
      height:@height;
      min-width:@height;
      padding: 0;
      .q-checkbox__bg{
        color:#03A9F4;
        top: 5px;
        height: 1.5em;
        width: 1.5em;
      }
    }
  }
  .ad-list{
    background-color:#fff;
    height: 60px;
    .ad{
      height:100%;
    }
    .add-ad{
      color:#fff;
      display:flex;
      font-size:18px;
      align-items: center;
      justify-content: center;
      background-color: #ff853a;
    }
  }
}
</style>
<template>
  <q-layout>
    <div class="hot-container" v-if="HotContent">
      <link rel="stylesheet" :href="HotContent.extra_style" v-if="HotContent.extra_style"/>
      <div class="title">{{HotContent.title}}</div>
      <div class="media_meta" v-if="HotContent.author || HotContent.source_time">
        <a class="author_name" href="javascript:;">{{HotContent.author}}</a>
        <span class="publish_time">{{HotContent.source_time}}</span>
      </div>
      <div class="top-ad" v-if="form.show_top">
        <Row class="text-white bg-primary" type="flex">
          <i-col>ad宝</i-col>
          <i-col style="flex:1; text-align: center">每天花5秒分享立即赚钱的APP</i-col>
          <i-col>立即下载</i-col>
          <q-badge color="white" text-color="primary" floating transparent @click="closeTop">
            <Icon type="md-close"></Icon>
          </q-badge>
        </Row>
      </div>
      <div v-html="HotContent.content"></div>
    </div>
    <div class="body loading" v-else><loading center="center"/></div>
    <div class="bottom-ad">
      <div>
        <Row class="setting">
          <i-col span="12" class="text-left">
            <q-btn dense flat size="md" @click="this.selectAd">选择广告模板</q-btn>
          </i-col>
          <i-col span="12" class="text-right">
            <q-checkbox color="blue" v-model="form.bottom_float" label="悬浮展示"/>
          </i-col>
        </Row>
        <div class="ad-list">
          <div v-for="(ad, index) in form.ads" :key="index" class="ad"></div>
          <div class="ad add-ad" v-if="!form.ads.length">
            <q-btn flat @click="selectAd">添加广告</q-btn>
          </div>
        </div>
      </div>
    </div>
    <select-ad v-model="form.ads" ref="adModal"/>
  </q-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import loading from 'src/components/loading'
import selectAd from 'src/components/select-ad'
export default {
  inject: ['setTitle', 'registerRightComponent'],
  components: { loading, selectAd },
  data () {
    return {
      title: '热文详情',
      HotContent: null,
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
        } else this.$Message.error(message || '加载失败，请重试')
      }).catch(e => {
        this.$Message.error('加载失败，请稍后重试')
      })
    } else this.$router.back()
    this.registerRightComponent(h => h('q-btn', {
      props: {
        color: 'primary',
        flat: true
      },
      on: { click: this.publish }
    }, '发布'))
  },
  methods: {
    closeTop () {
      if (this.HotVip) this.form.show_top = false
      else {
        this.$Modal.error({
          title: '操作失败',
          content: '关闭顶部广告需要开通热文推会员，您当前未开通。'
        })
      }
    },
    selectAd () {
      this.$refs.adModal.$open()
    },
    publish () {
      this.$http.publishHottext(this.HotContent.id, this.form, ({ errcode, data, message }) => {
        console.log(data)
      })
    }
  }
}
</script>
