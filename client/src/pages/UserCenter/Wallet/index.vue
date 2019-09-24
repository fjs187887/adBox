<style lang="less" scoped>
.topBox{
  .bgMoney{
    width: 100%;
    min-height: 150px;
    padding: 23px 0;
    background-image: url('../../../statics/money/bg.png');
    background-size: 100% 100%;
    color: #fff;
    text-align: center;
    p{
      font-size: 12px;
    }
    h5{
      font-size: 35px;
      line-height: 1;
      margin: 10px 0 25px;
    }
    .q-btn{
      width: 85px;
      height: 30px;
      min-height: 0;
      font-size: 12px;
      padding:0;
      color: #fff;
      font-weight: normal;
    }
  }
  .profitBox{
    .itemBox{
      .btBorder::after{
        width: 80px;
        left: 55px;
      }
      .leBorder::before{
        height: 40px;
        top: 33px;
      }
      div{
        position: relative;
        padding: 30px 0;
        text-align: center;
        h6{
          font-size: 18px;
          font-weight: 600;
          line-height: 1;
          color: #ff853a;
          margin-bottom: 10px;
        }
        p{
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
.cenBox{
  padding: 30px 20px 120px;
  .chartContent{
    width: 100%;
    height: 300px;
  }
  .syphb{
    margin: 10px auto 0px;
    width: 95px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 17px;
    }
    span{
      margin-left:5px;
      font-size: 13px;
      color: #ff853a;
    }
  }
}
.bottomBox{
  position:fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  .q-btn{
    width: 100%;
    background-color: #ff853a;
    color: #fff;
    font-size: 13px;
    font-weight: normal;
    min-height: 0;
    height: 40px;
    box-shadow: none;
  }
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <div class="topBox">
      <!-- 北京栏 -->
      <div class="bgMoney">
        <p>可提现零钱</p>
        <h5>{{dataInfo.wallet || 0}}</h5>
        <q-btn outline @click="startPage('/cash-out')">立即提现</q-btn>
      </div>
      <!-- 四格 -->
      <div class="profitBox">
        <div class="itemBox row">
          <div class="col-6 btBorder">
            <h6>{{seriesData[6] || 0}}</h6>
            <p>今日收益</p>
          </div>
          <div class="col-6 btBorder leBorder">
            <h6>{{dataInfo.all_income || 0}}</h6>
            <p>累计收益</p>
          </div>
          <div class="col-6">
            <h6>{{dataInfo.task_income || 0}}</h6>
            <p>任务收益</p>
          </div>
          <div class="col-6 leBorder">
            <h6>{{dataInfo.invite_income || 0}}</h6>
            <p>邀请收益</p>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- echarts -->
    <div class="cenBox">
      <div class="chartContent" ref="myChart"></div>
      <div class="syphb" @click="startPage('/revenue-list')">
        <img src="statics/money/huangguan.png" alt="">
        <span>收益排行榜</span>
      </div>
    </div>
    <div class="bottomBox topBorder">
      <q-btn rounded @click="startPage('/Invit')">赚取更多收益</q-btn>
    </div>
  </q-layout>
</template>

<script>
import echarts from 'echarts'

export default {
  inject: ['setTitle', 'registerRightComponent'],
  mounted () {
    this.setTitle('零钱')
    this.registerRightComponent(h => h('q-btn', {
      props: {
        dense: true,
        flat: true
      },
      on: { click: () => { this.startPage('/budget-detailed') } } }, '收支明细'))
    this.drawLine()
  },
  data () {
    return {
      dataInfo: '',
      myChart: '',
      xaxisData: [],
      seriesData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http.post('app/Wallet/index', (res) => {
        if (res.code === 0) {
          this.dataInfo = res.data
          for (const argument of res.data.sevenday_income) {
            this.xaxisData.push(argument.times)
            this.seriesData.push(argument.count)
          }
          this.drawLine()
        } else {
          this.$toast.fail('网络错误')
        }
      })
    },
    startPage (path, data) {
      this.$router.push({ path: path, query: { data: data } })
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart)
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        legend: {
          data: ['过去7天收益趋势']
        },
        xAxis: {
          data: this.xaxisData
        },
        yAxis: {},
        series: [
          {
            name: '过去7天收益趋势',
            type: 'line',
            data: this.seriesData
          }
        ]
      })
    }
  }
}
</script>
