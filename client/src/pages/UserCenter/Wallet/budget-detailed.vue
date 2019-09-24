<style lang="less" scoped>
  .scrollBox{
    width: 100%;
    overflow-x: scroll;
  }
  .pay-item {
    border-radius: 10px;
    width: 20%;
    margin: 10px 2.5%;
    height: auto;
    line-height: 3;
    color: black;
    border: 1px grey solid;
  }
  .pay-item.primary {
    border: 1px #ff853a solid;
    color: #ff853a;
  }
</style>

<template>
  <q-layout>
    <Affix class="isFixed" :offset-top="45">
      <div v-if="show" class="scrollBox bg-white">
        <div class="row text-center text-grey ">
          <div v-for="item of sxOptions" :key="item.id" class="pay-item" :class="{primary: optionModel===item.value}" @click="plf_checked(item.value)">
            <p>{{item.label}}</p>
          </div>
        </div>
      </div>
    </Affix>
    <q-page-container>
      <q-page class="animated fadeIn">
        <q-infinite-scroll ref="listScoll" @load="loadMore" :offset="250" :disable="true">
          <q-pull-to-refresh @refresh="refresh">
            <q-list class="row" v-for="dataInfo in listInfo" :key="dataInfo.id" @click="startPage(dataInfo)">
              <q-item class="col-12">
                <q-item-section>
                  <q-item-label >{{dataInfo.source_type | budgetType}}</q-item-label>
                  <q-item-label >{{dataInfo.notes}}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>{{dataInfo.expense_income | checkStatus}}{{dataInfo.amount}}</q-item-label>
                  <q-item-label  >{{dataInfo.create_time || 0}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset ></q-separator>
            </q-list>
          </q-pull-to-refresh>
        </q-infinite-scroll>
        <q-page-scroller position="bottom-right" :scroll-offset="250" :offset="[18, 18]">
          <q-btn class="toTop" fab icon="keyboard_arrow_up" color="primary"></q-btn>
        </q-page-scroller>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  filters: {
    checkStatus (status) {
      switch (status) {
        case 1:
          return '+'
        case -1:
          return '-'
      }
    },
    budgetType (status) {
      switch (status) {
        case 0:
          return '订单'
        case 1:
          return '任务变动'
        case 2:
          return '金币任务'
        case 3:
          return '推广收益'
        case 4:
          return '提现'
        case 5:
          return '金币兑换'
        case 6:
          return '抽奖拼团'
        case 7:
          return '中奖奖励金币'
        case 8:
          return '金币商城签到'
        case 9:
          return '抽奖退金币'
      }
    },
    formatTime (value) {
      let date = new Date(value * 1000)
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].map(i => i < 10 ? `0${i}` : i).join(':')
    }
  },
  inject: ['setTitle', 'registerRightComponent'],
  mounted () {
    this.setTitle('收支明细')
    this.registerRightComponent(h => h('q-btn', {
      props: {
        dense: true,
        flat: true
      },
      on: { click: () => { this.toggle() } } }, '筛选'))
  },
  data () {
    return {
      listInfo: [],
      show: false,
      optionModel: 0,
      sxOptions: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '任务收益',
          value: 1
        },
        {
          label: '邀请收益',
          value: 3
        },
        {
          label: '提现',
          value: 2
        },
        {
          label: '零钱支付',
          value: 4
        },
        {
          label: '冻结',
          value: 5
        }
      ]
    }
  },
  created () {
    this.optionModel = this.$route.query.data
    this.getData()
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    plf_checked (index) {
      this.show = !this.show
      this.optionModel = index
      this.getData()
    },
    startPage (path) {
      this.$router.push({ path: path, query: '' })
    },
    getData () {
      this.listInfo = []
      this.$http.walletDetail({ type: this.optionModel }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
          this.$refs.listScoll.resume()
        } else {

        }
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
      this.$http.walletDetail({ type: this.optionModel, page: index }, data => {
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
      this.listInfo = []
      this.$http.walletDetail({ type: this.optionModel }, data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listInfo = data.data
        } else {

        }
        done(true)
      }).catch(e => {
      })
    }
  }
}
</script>
