<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-input rounded bottom-slots v-model="condition" placeholder="请输入自媒体资源名称" :dense="true"
               style="padding: 5px;color:#000">
        <template v-slot:before>
          <q-icon name="ion-ios-tv" @click="$router.push('/')"></q-icon>
        </template>
        <template v-slot:prepend>
          <q-icon name="search"></q-icon>
        </template>
        <template v-slot:after>
          <q-btn class="text-subtitle2 bg-primary text-white"  @click="searchByType()">搜索</q-btn>
        </template>
      </q-input>
      <q-toolbar style="background: #fff;color: #000">
        <q-tabs v-model="tab" align="center" active-color="primary" style="font-size: 14px;color: #000" narrow-indicator>
          <q-tab name="1">任务</q-tab>
          <q-tab name="2" @click="startPage('/searchforuser',condition)">商家号</q-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-infinite-scroll ref="taskScroll" @load="search" :offset="250">
          <div v-for="dataInfo in listInfo" :key="dataInfo.id" class="row magin10 border-line">
            <q-item class="col-9">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="dataInfo.cover">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{dataInfo.title}}</q-item-label>
                <q-item-label caption>剩余：{{dataInfo.surplus}}%</q-item-label>
              </q-item-section>
            </q-item>
            <div class="col-3" align="center">
              <p class="col-12 text-primary">{{dataInfo.max_income}}元</p>
              <q-btn v-if="dataInfo.status==1" class="col-12 bg-grey text-white btn-right-c" @click="startPage('/taskdetail',dataInfo)">已抢光</q-btn>
              <q-btn v-else class="col-12 bg-primary text-white btn-right-c" @click="startPage('/taskdetail',dataInfo)">领取任务</q-btn>
            </div>
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
            </div>
          </template>
        </q-infinite-scroll>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="info"></q-btn>
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      tab: '1',
      condition: '',
      show: 'task',
      listInfo: []
    }
  },
  created () {
    this.condition = this.$route.query.data
    if (this.condition) {
      this.searchByType()
    }
  },
  methods: {
    searchByType (index) {
      this.listInfo = []
      this.$http.getSearch({ key: this.condition, type: this.show, page: index }, data => {
        if (data.code === 0) {
          if (data.data.task.length > 0) {
            this.listInfo = data.data.task
            this.$refs.taskScroll.resume()
          }
        } else {
          this.$q.notify({ message: '无数据' })
        }
      })
      //   .catch(e => {
      //   this.$q.notify({ message: '无数据' + e })
      // })
    },
    search (index, done) {
      console.log(this.condition)
      if (this.listInfo.length === 0) {
        this.$refs.taskScroll.reset()
        done(true)
        return
      }
      index = index + 1
      this.$http.getSearch({ key: this.condition, type: this.show, page: index }, data => {
        if (data.code === 0 && data.data.task.length > 0) {
          this.listInfo = this.listInfo.concat(data.data.task)
          done(false)
        } else {
          done(true)
        }
      }).catch(e => {
        done(true)
      })
    },
    startPage (path, data) {
      this.$router.push({ path: path, query: { data: data } })
    }
  }
}
</script>

<style scoped>
  .magin10{
    margin-top: 10px;
  }
  .border-line{
    border-bottom: 1px #eee solid;
    padding: 0 16px 10px 0;
  }
  .btn-right-c{
    /*width: auto;*/
    height: 30px;
    margin-top: 5px;
    font-size:12px;
  }
  .img{
    height: 45px;
    max-width: 45px;
    border-radius: 50%;
  }
</style>
