<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout>
    <q-infinite-scroll ref="listScoll" @load="loadMore">
      <q-pull-to-refresh @refresh="refresh">
        <nodata v-if="nodata"/>
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
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      tab: '1',
      listInfo: [],
      model: '',
      loadings: false,
      status: '3',
      nodata: false
    }
  },
  methods: {
    startPage (data) {
      this.$router.push({ path: '/taskdetailmini', query: { data: data, tid: data.task_id } })
    },
    refresh (done) {
      this.listInfo = []
      this.$http.usertask({ type: 2, status: this.status }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
          if (this.listInfo.length > 9) {
            this.$refs.listScoll.reset()
            this.$refs.listScoll.resume()
          }
        } else {
          this.nodata = true
        }
        done()
      }).catch(e => {
        done()
      })
    },
    loadMore (index, done) {
      if (index === 1) {
        this.listInfo = []
      }
      this.$http.usertask({ type: 2, page: index, status: this.status }, data => {
        if (data.code === 0 && data.data.length >= 0) {
          this.listInfo = this.listInfo.concat(data.data)
          if (data.data.length < 10) {
            this.$refs.listScoll.stop()
          }
        }
        if (this.listInfo.length === 0) {
          this.nodata = true
          this.$refs.listScoll.stop()
        }
        done()
      }).catch(e => {
        done()
      })
    }
  }
}
</script>
