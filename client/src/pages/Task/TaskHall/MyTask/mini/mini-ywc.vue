<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout>
    <q-page-container>
      <q-page>
        <div style="text-align: center;" v-if="loadings">
          <q-spinner-hourglass
            color="primary"
            size="2em"
          />加载中
        </div>
        <q-infinite-scroll ref="listScoll" @load="loadMore" :offset="250" :disable="true">
          <q-pull-to-refresh @refresh="refresh">
            <div v-for="dataInfo in listInfo" :key="dataInfo.id" class="row magin10 border-line" @click="startPage(dataInfo)">
              <q-item class="col-9">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="dataInfo.cover">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{dataInfo.title}}</q-item-label>
                  <q-item-label caption>简介：{{dataInfo.auth_introduction||'暂无介绍'}}</q-item-label>
                </q-item-section>
              </q-item>
              <div class="col-3" style="text-align: center">
                <p class="col-12 text-primary">{{dataInfo.uv_income||0}}元</p>
                <q-btn class="col-12 bg-primary text-white btn-right-c" @click="startPage(dataInfo)">详情</q-btn>
              </div>
            </div>
          </q-pull-to-refresh>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
            </div>
          </template>
        </q-infinite-scroll>
        <q-page-scroller position="bottom-right" :scroll-offset="250" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="info"></q-btn>
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      tab: '1',
      listInfo: [],
      model: '',
      loadings: false,
      status: '2'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    startPage (data) {
      this.$router.push({ path: '/taskdetailmini', query: { data: data, tid: data.task_id } })
    },
    getData () {
      this.loadings = true
      this.$http.usertask({ type: 2, status: this.status }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
          this.$refs.listScoll.resume()
        } else {

        }
        this.loadings = false
      }).catch(e => {
      })
    },
    loadMore (index, done) {
      if (this.listInfo.length === 0) {
        this.$refs.listScoll.reset()
        done(true)
        return
      }
      index = index + 1
      this.$http.usertask({ type: 2, page: index, status: this.status }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = this.listInfo.concat(data.data)
          done(false)
        } else {
          done(true)
        }
      }).catch(e => {
        done(true)
      })
    },
    refresh (done) {
      this.loadings = true
      this.listInfo = []
      this.$http.usertask({ type: 2, status: this.status }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
        } else {

        }
        done(true)
        this.loadings = false
      }).catch(e => {
      })
    }
  }
}
</script>

<style scoped>

</style>
