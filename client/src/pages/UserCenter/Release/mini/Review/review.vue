<style scoped>

</style>

<template>
  <q-layout>
    <div class="row bg-primary text-white" align="center" style="padding: 20px 0">
      <div class="col-4 ">
        <p>待审核</p>
        <p style="line-height: 2">{{info.revienumber}}</p>
      </div>
      <div class="col-4 ">
        <p>已通过</p>
        <p style="line-height: 2">{{info.subnumber}}</p>
      </div>
      <div class="col-4 ">
        <p>已拒绝</p>
        <p style="line-height: 2">{{info.belownumber}}</p>
      </div>
    </div>
    <q-tabs class="col-8" v-model="tab" indicator-color="transparent" active-color="primary" narrow-indicator>
      <q-tab name='1' class="tabs" @click="review(0)">待审核</q-tab>
      <q-tab name='2' class="tabs" @click="review(1)">已通过</q-tab>
      <q-tab name='3' class="tabs" @click="review(2)">已拒绝</q-tab>
    </q-tabs>
    <nodata v-if="nodata"/>
    <div v-for="dataInfo in shareList" :key="dataInfo.id" @click="startPage(dataInfo)">
      <q-item >
        <q-item-section avatar>
          <q-avatar>
            <img :src="dataInfo.avatar">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{dataInfo.nickname}}</q-item-label>
          <q-item-label>{{dataInfo.update_time}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{tab | checkStatus}}</q-item-label>
          <q-item-label v-if="tab!=3">收益：{{dataInfo.real_income}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator insert></q-separator>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'review-detail',
  inject: ['setTitle'],
  mounted: function () {
    this.setTitle('任务审核')
  },
  filters: {
    checkStatus (status) {
      switch (status) {
        case '1':
          return '待审核'
        case '2':
          return '已通过'
        case '3':
          return '已拒绝'
      }
    },
    formatTime (value) {
      let date = new Date(value * 1000)
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].map(i => i < 10 ? `0${i}` : i).join(':')
    }
  },
  data () {
    return {
      tab: '1',
      shareList: [],
      info: '',
      nodata: false
    }
  },
  created () {
    this.review(0)
    this.reviewTaskNumber()
  },
  methods: {
    startPage (data) {
      if (this.tab !== '1') {
        this.$router.push({ path: '/submitdetail', query: { id: data.id } })
      } else {
        this.$router.push({ path: '/review-detail', query: { data: data } })
      }
    },
    review (type) {
      this.shareList = []
      this.nodata = false
      this.$http.userReviewTask({ page: 1, type: type }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.shareList = data.data
          if (data.msg) {
            this.$toast.success(data.msg)
          }
        } else {
          this.nodata = true
        }
      }).catch(e => {
      })
    },
    reviewTaskNumber () {
      this.$http.reviewTaskNumber(data => {
        if (data.code === 0 && data.data !== null) {
          this.info = data.data
          if (data.msg) {
            this.$toast.success(data.msg)
          }
        }
      }).catch(e => {
      })
    }
  }
}
</script>
