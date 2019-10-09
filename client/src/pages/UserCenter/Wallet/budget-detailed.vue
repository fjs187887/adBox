<style lang="less" scoped>
  .scrollBox{
    position: fixed;
    top:50px;
    left:0;
    z-index: 10;
    background: #ffffff;
    width: 100%;
    overflow-x: scroll;
    border-bottom: 5px solid #e6e6e6;
    .scrollItem{
      width: 550px;
      .pay-item {
        border-radius: 3px;
        width: 75px;
        margin: 10px 0px 10px 15px;
        height: 30px;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px #999 solid;
      }
      .pay-item.primary {
        border: 1px #ff853a solid;
        color: #ff853a;
      }
    }
  }
</style>

<template>
  <q-layout>
      <div v-if="show" class="scrollBox">
        <div class="row text-center scrollItem">
          <div v-for="item of sxOptions" :key="item.id" class="pay-item" :class="{primary: optionModel===item.value}" @click="plf_checked(item.value)">
            <p>{{item.label}}</p>
          </div>
        </div>
      </div>
    <q-page-container>
      <q-page class="animated ">
        <q-infinite-scroll ref="listScoll" @load="loadMore">
          <q-pull-to-refresh @refresh="refresh">
            <nodata v-if="nodata"/>
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
      ],
      nodata: false
    }
  },
  created () {
    this.optionModel = this.$route.query.data
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    plf_checked (index) {
      this.show = !this.show
      this.optionModel = index
      this.refresh()
    },
    startPage (path) {
      this.$router.push({ path: path, query: '' })
    },
    loadMore (index, done) {
      if (index === 1) {
        this.listInfo = []
      }
      this.$http.walletDetail({ type: this.optionModel, page: index }, data => {
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
    },
    refresh (done) {
      this.listInfo = []
      this.$http.walletDetail({ type: this.optionModel }, data => {
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
    }
  }
}
</script>
