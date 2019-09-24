<style scoped>

</style>

<template>
  <q-layout>
    <div class="row bg-primary text-white" align="center" style="padding: 20px 0">
      <div class="col-4 ">
        <p>总阅读数</p>
        <p style="line-height: 2">{{info.revienumber}}</p>
      </div>
      <div class="col-4 ">
        <p>总点击数</p>
        <p style="line-height: 2">{{info.subnumber}}</p>
      </div>
      <div class="col-4 ">
        <p>总转发数</p>
        <p style="line-height: 2">{{info.belownumber}}</p>
      </div>
    </div>
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
<!--        <q-item-section side>-->
<!--          <q-item-label>{{tab | checkStatus}}</q-item-label>-->
<!--          <q-item-label v-if="tab!=3">收益：{{dataInfo.real_income}}</q-item-label>-->
<!--        </q-item-section>-->
      </q-item>
      <q-separator inset></q-separator>
      <div class="row text-center text-black" style="line-height: 3">
        <div class="col-4">阅读数：{{dataInfo.id}}</div>
        <div class="col-4">点击数：{{dataInfo.task_id}}</div>
        <div class="col-4">转发数：{{dataInfo.task_uid}}</div>
      </div>
      <q-separator ></q-separator>
      <q-separator ></q-separator>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'review-detail',
  inject: ['setTitle'],
  mounted: function () {
    this.setTitle('我的热文')
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
      info: ''
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
      this.$http.userReviewTask({ page: 1, type: type }, data => {
        if (data.code === 0 && data.data !== null) {
          this.shareList = data.data
          if (data.msg) {
            this.$toast.success(data.msg)
          }
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
