<style scoped lang="less">
// 头部背景
.topBox{
  padding: 22px 15px;
  .statusTxt{
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    line-height: 1;
    margin-bottom:15px;
  }
  .tipsTxt{
    font-size: 12px;
    line-height: 1;
  }
}
// 菜单导航
.menuBox{
  border-bottom: 1px solid #e6e6e6;
  height:50px;
  padding:0 15px;
  .q-tabs{
    font-size: 15px;
    color: #666;
    .tabs{
      padding: 0;
      margin-right: 15px;
      flex: unset!important;
    }
  }
}
// 1广告详情 中内容
.contentBox{
  padding: 0 15px 25px;
  .item{
    margin-top: 25px;
    font-size: 13px;
    p{
      color: #666;
    }
    span{
      color: #333;
      width:75%;
      white-space:nowrap;
      text-overflow:ellipsis;
      -o-text-overflow:ellipsis;
      overflow: hidden;
    }
    .imgBox{
      flex: unset!important;
      height: 84px;
      width: 84px;
      border-radius: 3px;
      overflow: hidden;
      img{
        width: 100%;
        height:100%;
      }
    }
  }
}
  // 1 广告要求
.bottomBox{
  padding:20px 15px;
  position:relative;
  p{
    font-size: 15px;
    color: #333;
    line-height: 1;
    margin-bottom: 15px;
  }
  .yqTxt{
    color: #333;
    line-height: 24px;
  }
}
// 按钮
.btnBox{
  padding: 17px 15px;
  float: right;
  .q-btn{
    width: 90px;
    height: 15px;
    border: 1px solid #999;
    color: #999;
    font-size: 13px;
    margin-left:20px;
    border-radius: 3px;
    box-shadow:none;
  }
}
// 2数据报表
.dataBox{
  padding:0px 15px 30px;
  .dataItem{
    position: relative;
    font-size: 12px;
    color:#666;
    margin-top: 30px;
    text-align: center;
    .text-primary{
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
  .itemBorder:after{
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      width:0;
      height: 60%;
      border-right: 1px solid #999;
      transform: scaleX(0.5)
    }
  .txtBox{
    color: #333;
    span{
      float: left;
      line-height: 20px;
    }
    .tipsTxt{
      line-height: 20px;
      padding-left: 40px;
    }
  }
}
.chartBox{
  padding-bottom: 30px;
  .chartTit{
    padding: 30px 15px;
    font-size: 15px;
    color: #333;
  }
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <!-- 背景栏 -->
    <div class="row bg-primary text-white topBox">
      <div class="col-12 statusTxt">
        <p>{{contact.status | checkStatus}}</p>
      </div>
      <div class="col-12 tipsTxt">
        <div v-if="contact.status===0" class="col-12">支付剩余时间：<count-down :end-time="endTime"></count-down></div>
        <div v-if="contact.status===1" class="col-12">开始时间：{{contact.start_time | formatTime}}</div>
        <div v-if="contact.status===2" class="col-12">结束时间：{{contact.end_time | formatTime}}</div>
        <div v-if="contact.status===3" class="col-12">任务已经结束，查看数据报表</div>
        <div v-if="contact.status===4" class="col-12">超时未支付，已取消订单</div>
        <div v-if="contact.status===5" class="col-12">广告内容不合规，产看原因及修改建议</div>
      </div>
    </div>
    <!-- 切换菜单栏 -->
    <div class="row menuBox">
      <q-tabs class="col-8" v-model="tab" indicator-color="black" active-color="black" narrow-indicator>
        <q-tab name="1" class="tabs">广告详情</q-tab>
        <q-tab name="2" class="tabs">数据报表</q-tab>
        <q-tab name="3" class="tabs">分享明细</q-tab>
      </q-tabs>
    </div>
    <!-- 内容信息 -->
<!-- 1广告详情 -->
    <div v-show="tab==1">
      <div class="contentBox">
        <div class="row item">
          <p class="col-3">订单编号：</p>
          <span class="col">{{contact.id}}</span>
        </div>
        <div class="row item">
          <p class="col-3">创建时间：</p>
          <span class="col">{{contact.create_time | formatTime}}</span>
        </div>
        <div class="row item">
          <p class="col-3">分享语：</p>
          <span class="col">{{contact.title}}</span>
        </div>
        <div class="row item">
          <p class="col-3">分享图：</p>
          <span class="col imgBox">
            <img :src="contact.cover" />
          </span>
        </div>
        <div class="row item">
          <p class="col-3">任务预算：</p>
          <span class="col">{{contact.budget}}元</span>
        </div>
        <div class="row item">
          <p class="col-3">转发单价：</p>
          <span class="col">{{contact.uv_income}}元</span>
        </div>
        <div class="row item">
          <p class="col-3">转发次数：</p>
          <span class="col">{{contact.click_num}}次</span>
        </div>
        <div class="row item">
          <p class="col-3">分享人群：</p>
          <span class="col">{{contact.tousersName}}</span>
        </div>
        <div class="row item">
          <p class="col-3">分享地域：</p>
          <span class="col">{{contact.pub_area_name}}</span>
        </div>
        <div class="row item">
          <p class="col-3">分享平台：</p>
          <span class="col">{{contact.pub_platform_name}}</span>
        </div>
        <div class="row item">
          <p class="col-3">推广时间：</p>
          <span class="col">{{contact.start_time | formatTime}} — {{contact.end_time | formatTime}}</span>
        </div>
      </div>
      <!-- 线 -->
      <div class="line"></div>
      <!-- 分享要求 -->
      <div class="row btBorder bottomBox">
        <p class="row col-12">分享要求</p>
        <div class="yqTxt" v-html="contact.task_step_explain"></div>
      </div>
      <!-- 按钮 -->
      <div class="row btnBox" v-if="contact.status===0">
        <q-btn rounded class="col-4" @click="$router.back()">取消</q-btn>
        <q-btn rounded class="col-4" @click="pay(contact.order_sn)">支付</q-btn>
      </div>
    </div>
<!-- 2数据报表 -->
    <div v-show="tab==2">
      <div class="row dataBox">
        <div class="col-4 dataItem itemBorder">
          <p class="text-primary ">{{dataTable.budget || 0}}</p>
          <p>预算（元）</p>
        </div>
        <div class="col-4 dataItem itemBorder">
          <p class="text-primary ">{{dataTable.consume || 0}}</p>
          <p>已消耗（元）</p>
        </div>
        <div class="col-4 dataItem">
          <p class="text-primary ">{{dataTable.budget - dataTable.consume || 0}}</p>
          <p>剩余（元）</p>
        </div>
        <div class="col-4 dataItem itemBorder">
          <p class="text-primary">{{dataTable.forward  || 0}}/{{contact.click_num || 0}}</p>
          <p>转发数</p>
        </div>
        <div class="col-4 dataItem itemBorder">
          <p class="text-primary ">{{dataTable.complete || 0}}</p>
          <p>完成数</p>
        </div>
        <div class="col-4 dataItem">
          <p class="text-primary ">{{dataTable.unqualified || 0}}</p>
          <p>不合格数</p>
        </div>
        <!-- 总结 文字 -->
        <div class="dataItem txtBox">
          <span>总结：</span>
          <p class="tipsTxt">
            本次任务消耗{{dataTable.consume || 0}}元，
            应得付费点击数{{dataTable.click_num || 0}}次；
            实际点击数{{dataTable.total || 0}}次，
            实际点击数价值{{dataTable.pra_value || 0}}元，
            为您节省{{dataTable.economize || 0}}元</p>

        </div>
      </div>
      <!-- 线 -->
      <div class="line"></div>
      <div class="chartBox">
        <div class="row chartTit">
          <p class="col">数据走势</p>
        </div>
        <div class="chartContent" style="width: 100vw;height: 300px" ref="myChart"></div>
      </div>
    </div>
<!-- 3分享明细 -->
    <div v-show="tab==3">
      <q-tabs v-show="contact.tousers==1" class="col-8 text-black q-tabs-c" v-model="tabMs" indicator-color="transparent" active-color="primary" narrow-indicator>
        <q-tab name="1" class="tabs" @click="switchShareInfo (0)">已分享</q-tab>
        <q-tab name="2" class="tabs" @click="switchShareInfo (1)">未分享</q-tab>
      </q-tabs>
      <br>
      <q-infinite-scroll ref="listScoll" @load="loadMore" :offset="250" :disable="tab!=3">
        <q-pull-to-refresh @refresh="refresh">
          <!-- item模块 -->
          <q-list v-for="dataInfo in shareList" :key="dataInfo.id">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="dataInfo.avatar">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{dataInfo.nickname}}</q-item-label>
                <q-item-label v-if="tabMs!=2" >{{dataInfo.update_time}}</q-item-label>
              </q-item-section>
              <q-item-section v-if="tabMs==2" side>
                <q-item-label>未分享</q-item-label>
              </q-item-section>
              <q-item-section v-else side>
                <q-item-label>{{dataInfo.status | checkReview}}</q-item-label>
                <q-item-label v-if="contact.isfree!=1">收益：{{dataInfo.task_income}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator></q-separator>
          </q-list>
        </q-pull-to-refresh>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
          </div>
        </template>
      </q-infinite-scroll>
      <q-page-scroller position="bottom-right" :scroll-offset="250" :offset="[18, 18]">
        <q-btn class="toTop" fab icon="keyboard_arrow_up" color="primary"></q-btn>
      </q-page-scroller>
    </div>
  </q-layout>
</template>

<script>
import echarts from 'echarts'
import areas from '../../../../../assets/jsons/city'
import CountDown from '../../../../../components/CountDown'

export default {
  name: 'release-task-detail',
  inject: ['setTitle', 'registerRightComponent'],
  components: { CountDown },
  mounted: function () {
    this.setTitle('详情')
    this.registerRightComponent(h => h('q-btn', {
      props: {
        dense: true,
        flat: true
      },
      on: { click: () => { this.$router.push({ path: '/taskdetailmini', query: { tid: this.contact.tid } }) } } }, '广告预览'))
    // this.drawLine()
  },
  filters: {
    checkStatus (status) {
      switch (status) {
        case 0:
          return '待支付'
        case 1:
          return '未开始'
        case 2:
          return '进行中'
        case 3:
          return '已完成'
        case 4:
          return '已取消'
        case 5:
          return '不通过'
      }
    },
    checkReview (status) {
      switch (status) {
        case 1:
          return '待审核'
        case 2:
          return '已通过'
        case 3:
          return '已拒绝'
      }
    },
    formatTime (value) {
      if (!value) {
        return ''
      }
      let date = new Date(value * 1000)
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours(), date.getMinutes()].map(i => i < 10 ? `0${i}` : i).join(':')
    }
  },
  data () {
    return {
      tab: '1',
      tabMs: '1',
      tid: '',
      contact: {},
      dataTable: '',
      shareList: [],
      listPlatform: [
        { label: '朋友圈', id: '1' },
        { label: '微信', id: '2' },
        { label: 'QQ', id: '3' },
        { label: 'QQ空间', id: '4' },
        { label: '微博', id: '5' }
      ],
      listTousers: [
        { label: '所有用户', id: '0' },
        { label: '粉丝', id: '1' }
      ],
      listFree: [
        { label: '付费', id: '0' },
        { label: '免费', id: '1' }
      ],
      listAreas: areas,
      endTime: '',
      loadings: false,
      status: 0
    }
  },
  created () {
    this.tid = this.$route.query.attach
    this.getDataInfo()
    this.taskReport()
    this.dataTrend()

    // this.contact = this.$route.query.data
  },
  methods: {
    share () {
      console.log('')
    },
    pay (id) {
      // console.log('')
      this.$Pay(id, res => {
        switch (res.status) {
          case 'success':
            this.getDataInfo()
            break
          case 'cancel':
            this.$toast.fail('支付取消')
            break
          case 'error':
            this.$toast.fail(res.data.message)
            break
        }
      })
    },
    drawLine (xaxis, share, totalnum, cost) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart)
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        legend: {
          data: ['总点击数', '付费点击数', '分享数']
        },
        xAxis: {
          data: xaxis
        },
        yAxis: {},
        series: [
          {
            name: '总点击数',
            type: 'line',
            data: totalnum
          },
          {
            name: '付费点击数',
            type: 'line',
            data: cost
          },
          {
            name: '分享数',
            type: 'line',
            data: share
          }
        ]
      })
    },
    getNameById () {
      for (let x in this.listTousers) {
        if (this.contact.tousers + '' === this.listTousers[x].id) {
          this.contact.tousersName = this.listTousers[x].label
        }
      }
      for (let x in this.listPlatform) {
        if (this.contact.pub_platform + '' === this.listPlatform[x].id) {
          this.contact.pub_platform_name = this.listPlatform[x].label
        }
      }
      for (let x in this.listFree) {
        if (this.contact.isfree + '' === this.listFree[x].id) {
          this.contact.isfreeName = this.listFree[x].label
        }
      }
      this.getCity(this.listAreas)
    },
    getCity (list) {
      for (let item of list) {
        if (item.children && item.children.length > 0) {
          this.getCity(item.children)
        } else if (this.contact.pub_area === item.id) {
          this.contact.pub_area_name = item.merger_name
        }
      }
    },
    payCunt () {
      let date = new Date(this.contact.start_time * 1000 + 30 * 60 * 1000)
      this.endTime = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].map(i => i < 10 ? `0${i}` : i).join(':')
    },
    getDataInfo () {
      this.$http.task({ tid: this.tid }, data => {
        if (data.code === 0 && data.data) {
          this.contact = data.data
          this.getNameById()
          if (this.contact.status === 0) {
            this.payCunt() // 待支付 开启倒计时
          }
        } else {

        }
      }).catch(e => {
      })
    },
    taskReport () {
      this.$http.taskReport({ tid: this.tid }, data => {
        if (data.code === 0 && data.data) {
          this.dataTable = data.data
        } else {

        }
      }).catch(e => {
      })
    },
    dataTrend () {
      this.$http.dataTrend({ tid: this.tid }, data => {
        if (data.code === 0 && data.data) {
          var res = data.data
          this.drawLine(res.xaxis, res.share, res.totalnum, res.cost)
        } else {

        }
      }).catch(e => {
      })
    },
    switchShareInfo (status) {
      this.status = status
      this.refresh()
    },
    loadMore (index, done) {
      if (index === 1) {
        this.shareList = []
      }
      this.$http.shareInfo({ tid: this.tid, status: this.status, page: index }, data => {
        if (data.code === 0 && data.data) {
          this.shareList = this.shareList.concat(data.data)
          if (data.data.length < 10) {
            this.$refs.listScoll.stop()
          }
        }
        if (this.shareList.length === 0) {
          this.$refs.listScoll.stop()
        }
        done()
      }).catch(e => {
        done()
      })
    },
    refresh (done) {
      this.shareList = []
      this.$http.shareInfo({ tid: this.tid, status: this.status }, data => {
        if (data.code === 0 && data.data) {
          this.shareList = data.data
          if (this.shareList.length > 9) {
            this.$refs.listScoll.reset()
            this.$refs.listScoll.resume()
          }
        }
        done()
      }).catch(e => {
      })
    }
  }
}
</script>
