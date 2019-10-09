<style lang="less" scoped>
.topBox{
  width: 100%;
  padding: 30px 15px;
  background: #ff853a;
  .col-6{
    color: #fff;
    p{
      font-size: 13px;
      padding-bottom: 10px;
      line-height: 1;
    }
    h6{
      font-size: 35px;
      line-height: 1;
    }
    span{
      display: block;
      float: right;
      font-size: 12px;
      padding-bottom: 10px;
    }
    .q-btn{
      float: right;
      width:90px;
      padding: 0;
      height: 30px;
      font-size: 13px;
      font-weight: normal;
      min-height: 0;
      background: #fff;
      box-shadow: none;
    }
  }
}
.textList{
  padding: 0 15px;
  .row{
    position: relative;
    padding: 20px 0;
    align-items: center;
    &:last-child{
      &::after{
        display: none;
      }
    }
    p{
      line-height: 1;
      font-size: 13px;
      color: #333;
    }
    span{
      display: block;
      float: right;
      text-align: right;
      font-size: 13px;
      color:#ff853a;
    }
  }
}
.cenBox{
  padding:0 15px;
  p{
    padding: 20px 0 30px;
    font-size: 14px;
    line-height: 1;
    color: #333;
    font-weight: 600;
  }
  .cenTitle{
    text-align: center;
    padding-bottom: 30px;
    font-size: 13px;
    color: #666;
  }
  .cenInfo{
    text-align: center;
    padding-bottom: 25px;
    font-size: 14px;
    color: #333;
    li{
      display: flex;
      align-items: center;
      justify-content: center;
      &:last-child{
        // text-align: right;
      }
    }
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="topBox row">
      <div class="col-6">
        <p>当前分红收益（元）</p>
        <h6>{{ current_money }}</h6>
      </div>
      <div class="col-6">
        <span>满{{ man_money }}元可转入零钱</span>
        <q-btn text-color="primary" @click="towallet">转入零钱</q-btn>
      </div>
    </div>
    <div class="textList">
      <div class="row btBorder" v-for="item in row1" :key="item.id">
        <p class="col-6">{{ item.lable }}</p>
        <span class="col-6">{{ item.value }}</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="cenBox">
      <p>我邀请的好友</p>
      <ul class="row cenTitle">
        <li class="col-3">好友</li>
        <li class="col-6">总任务数/近一周任务</li>
        <li class="col-3">分红</li>
      </ul>
      <q-infinite-scroll @load="onLoad">
      <ul class="row cenInfo" v-for="item in infos" :key="item.id">
        <li class="col-3">{{ item.phone_number }}</li>
        <li class="col-6">{{ item.all_count }}/{{ item.week_count }}</li>
        <li class="col-3 text-primary">{{ item.all_money }}</li>
      </ul>
      </q-infinite-scroll>
    </div>
    <nodata v-if="nodata"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      row1: [
        {
          id: 1,
          lable: '总分红收益（元）',
          value: ''
        },
        {
          id: 2,
          lable: '累计转入零钱（元）',
          value: ''
        },
        {
          id: 3,
          lable: '邀请好友数',
          value: ''
        }
      ],
      infos: [],
      current_money: '0.00',
      man_money: '',
      nodata: true
    }
  },
  inject: ['registerRightComponent', 'setTitle'],
  created () {
    this.shouyi()
  },
  mounted () {
    this.setTitle('邀请收益')
    // this.registerRightComponent(h => h('q-btn', {
    //   props: {
    //     dense: true,
    //     flat: true
    //   },
    //   on: {
    //     click: () => {
    //       console.log('click')
    //       this.alert = true
    //     }
    //   }
    // }, '使用规则'))
  },
  methods: {
    onLoad (index, done, status) {
      if (index === 1) {
        this.infos = []
      }
      setTimeout(() => {
        this.$http.post('app/UserInvite/invitlist', { page: index, status: status }, (res) => {
          if (res.data.list.length > 0) {
            this.nodata = false
            res.data.list.map((e) => {
              this.infos.push(e)
            })
            done(false)
          } else {
            done(true)
          }
        })
      }, 1000)
    },
    towallet () {
      this.$http.post('app/UserInvite/towallet', {}, (res) => {
        if (res.code === 0) {
          this.$toast.success('转入成功')
          this.shouyi()
        } else {
          this.$toast(res.msg)
        }
      })
    },
    shouyi () {
      this.$http.post('app/UserInvite/income', {}, (res) => {
        this.current_money = res.data.current_money
        this.row1[0].value = res.data.total_money
        this.row1[1].value = res.data.smallchange
        this.row1[2].value = res.data.invit_count
        this.man_money = res.data.man_money
      })
    }
  }
}
</script>
