<style lang="less" scoped>
  .signInBox{
    padding: 20px 0px;
    width: 100%;
    background-color: #ff853a;
    .signInTit{
      padding-left: 15px;
      align-items: center;
      .col-9{
        p{
          float: left;
          font-size:14px;
          color:#fff;
          font-weight: 600;
        }
        img{
          margin-left: 10px;
          width: 14px;
        }
      }
      .col{// 金币
        .goldBox{
          float: right;
          background: #fff;
          width: 65px;
          border-radius: 25px 0 0 25px;
          padding: 5px;
          img{
            width: 19px;
            margin-left: 2px;
            margin-right: 8px;
          }
          span{
            vertical-align: bottom;
            line-height: 19px;
            font-size: 14px;
            color: #ff853a;
          }
        }
      }
    }
    .signInInfo{// 签到
      padding:30px 15px 10px;
      ul{
        padding: 0;
        margin: 0;
        overflow: hidden;
        li.infoItem{
          list-style: none;
          flex: 1;
          &:last-child{
            flex: 0;
          }
          .statusImg{
            position: relative;
            margin-bottom: 15px;
            width: 24px;
            height: 24px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            &::after{
              content: '';
              position: absolute;
              top: 12px;
              right: 20px;
              width: 35px;
              height: 1px;
              background: #fff;
            }
            img{
              height: 10px;
              z-index: 10;
            }
          }
          p{
            font-size: 12px;
            color: #fff;
            text-align: left;
          }
        }
      }
    }
  }
  .itemBox{
    padding: 0px 15px;
    .itemTit{
      padding: 20px 0 10px;
      p{
        font-size: 14px;
        color: #333;
        font-weight: 600;
      }
    }
    .itemInfo{
      .item{
        position: relative;
        padding: 20px 0;
        align-items: center;
        &:last-child{
          &::after{
            display: none;
          }
        }
        .leftBox{
          .name{
            font-size: 13px;
            color: #333;
            span{
              margin-left: 10px;
              font-size: 12px;
              color: #ff853a;
            }
          }
          .tips{
            margin-top: 10px;
            font-size: 12px;
            color: #999;
            line-height: 1;
          }
          .redTxt{
            color: rgb(255,90,61);
          }
        }
        .rightBox{
          .q-btn{
            float: right;
            width: 70px;
            height: 30px;
            min-height: 0;
            padding: 0;
            border-radius:20px;
            box-shadow: none;
            border:1px solid #ff853a;
            color:#ff853a;
            font-size:12px;
          }
          .q-btn.off{
            border: 1px solid #999!important;
            color: #999!important;
          }
        }
      }
    }
  }
</style>

<template>
  <q-layout class="animated fadeIn">
    <!-- 签到 -->
    <div class="signInBox">
      <div class="signInTit row">
        <div class="col-9">
          <p class="">今日已签到</p>
          <img src="statics/newbron/wenhao.png" alt="">
        </div>
        <div class="col">
          <div class="goldBox" @click="tourl">
            <img src="statics/newbron/jinbi.png" alt="">
            <span>{{ goldval }}</span>
          </div>
        </div>
      </div>
      <div class="signInInfo">
        <ul class="row">
          <li class="infoItem" v-for="(item, index) in signIn" :key="index">
            <div class="statusImg">
              <!-- sign=true 已签-->
              <img v-if="item.sign" src="statics/newbron/dui.png" alt="">
              <img v-else src="statics/newbron/cuo.png" alt="">
            </div>
            <p>{{ item.date }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 每日任务 -->
    <div class="itemBox">
      <div class="itemTit">
        <p>每日任务</p>
      </div>
      <div class="itemInfo">
        <div class="row item btBorder" v-for="contact in daytask" :key="contact.id">
          <div class="col-9 row leftBox">
            <div class="col-12 name">{{contact.name}}{{ contact.icon }}
              <span>+{{contact.reward}}金币</span>
            </div>
            <div class="col-12 tips">{{contact.notes}}</div>
          </div>
          <div class="col-3 rightBox">
            <!-- 按钮 -->
            <q-btn v-if="contact.btname=='已领取'" class="off" @click="dayto(contact.url,contact.btname)">{{ contact.btname }}</q-btn>
            <q-btn v-else @click="dayto(contact.url,contact.btname)" >{{ contact.btname }}</q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 新手任务 -->
    <div class="itemBox">
      <div class="itemTit">
        <p>新手任务</p>
      </div>
      <div class="itemInfo">
        <div class="row item btBorder" v-for="contact in newtask" :key="contact.id">
          <div class="col-9 row leftBox">
            <div class="col-12 name">{{contact.name}}</div>
            <div class="col-12 redTxt tips">奖励：{{contact.reward}}金币</div>
          </div>
          <div class="col-3 rightBox">
            <!-- 按钮 -->
            <q-btn v-if="contact.btname=='已领取'" class="off" @click="newto(contact.url,contact.btname)">{{ contact.btname }}</q-btn>
            <q-btn v-else @click="newto(contact.url,contact.btname)">{{ contact.btname }}</q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'TaskCenter',
  inject: ['setTitle', 'registerRightComponent'],
  data () {
    return {
      daytask: [],
      newtask: [],
      signIn: [
        {
          sign: false,
          date: '周一'
        },
        {
          sign: false,
          date: '周二'
        },
        {
          sign: false,
          date: '周三'
        },
        {
          sign: false,
          date: '周四'
        },
        {
          sign: false,
          date: '周五'
        },
        {
          sign: false,
          date: '周六'
        },
        {
          sign: false,
          date: '周日'
        }
      ],
      goldval: 0
    }
  },
  created () {
    this.$http.post('app/PromotionTask/taskcenter', {}, (res) => {
      this.newtask = res.data.newtask
      this.daytask = res.data.daytask
    })
    this.oksign()
  },
  mounted () {
    this.setTitle('任务中心')
    // this.registerRightComponent(h => h('q-btn', {
    //   props: {
    //     dense: true,
    //     flat: true
    //   },
    //   on: {
    //     click: () => {
    //       this.$router.push({ path: '/Goldmall' })
    //     }
    //   }
    // }, '金币商城'))
  },
  methods: {
    dayto (url, name) {
      if (name === '已领取') {
        return false
      } else {
        this.$router.push({ path: url })
      }
    },
    newto (url, name) {
      if (name === '已领取') {
        return false
      } else {
        this.$router.push({ path: url })
      }
    },
    inits () {
      this.$http.post('app/Signin', {}, (res) => {
        this.signIn = res.data.list
        this.goldval = res.data.gold
      })
    },
    oksign () {
      this.$http.post('app/Signin/oksign', {}, (res) => {
        if (res.code === 0) {
          this.$toast.success({
            message: '签到成功',
            onClose: () => {
              this.inits()
            }
          })
        } else {
          this.inits()
        }
      })
    },
    tourl () {
      this.$router.push({ path: '/Goldmall' })
    }
  }
}
</script>
