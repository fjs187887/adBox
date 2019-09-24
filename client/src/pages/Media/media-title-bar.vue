<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <div class="row" style="border-bottom: 1px #eee solid;height: 40px;line-height: 40px;padding: 0 10px">
        <div class="col-4 text-black" @click="goback()">返回</div>
        <div class="col-4 text-black" style="text-align: center;">{{title}}</div>
        <div v-if="dialog"  class="col-4 text-primary" style="text-align: right;" @click="showDialog()">{{toLable}}</div>
        <div v-else class="col-4 text-primary" style="text-align: right;" @click="share()">分享</div>
      </div>
    </q-header>
    <q-header>
      <q-toolbar q-toolbar style="background: #fff;color: #000">
        <q-toolbar-title>
          <q-tabs align="left" style="font-size: 14px;color: #000">
            <q-route-tab to="/media/self-media" >自媒体</q-route-tab>
            <q-route-tab to="/media/merchant" >内容服务商</q-route-tab>
          </q-tabs>
        </q-toolbar-title>
        <q-btn @click="search()" flat round dense icon="search" />
        <!--        <q-btn @click="shopping()"  flat round dense icon="shopping_cart"/>-->
      </q-toolbar>
    </q-header>
    <q-page-container><router-view /></q-page-container>
    <q-page-container>
      <router-view />
      <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-primary text-white" style="width: 300px">
          <q-card-section>
            <div class="text-h6">任务说明</div>
          </q-card-section>

          <q-card-section>
            ① 分享链接到社交平台，好友点击阅读获取任务收益；
            <br/>
            ② 分享时添加分享语可以提升阅读量，点击分享时自动复制分享语；
            <br/>
            ③ 只有从APP分享出去的链接会产生收益，转发的链接不会产生收益。
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'title-bar',

  data () {
    return {
      title: '',
      toLable: '',
      dialog: false,
      persistent: false,
      contact: ''
    }
  },
  provide () {
    return {
      setTitle: title => {
        this.title = title
      },
      setLable: toLable => {
        this.toLable = toLable
      },
      initData: (contact, dialog) => {
        this.dialog = dialog
        this.contact = contact
      }
    }
  },
  methods: {
    share (contact) {
      this.$share(contact.title, contact.url, contact.picUrl, contact.url).then(data => {
        this.$set(this, 'display', data)
      }).catch(e => {
        console.dir(e)
      })
    },
    showDialog () {
      this.persistent = true
    },
    goback () {
      this.$router.back()
    }
  }
}
</script>
