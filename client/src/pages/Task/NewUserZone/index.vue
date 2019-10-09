<style scoped lang="less">
.margin15{ margin: 15px;}
.marTop0{
  margin-top: 0!important;
  min-height: 300px;
}
.q-carousel{
  height: 173px;
}
.q-layout{
  overflow: hidden;
  height: auto;
  background:#f2f2f2;
  section{
    border-radius:3.5px;
    background: #fff;
    overflow: hidden;
  }
}
.siBtnBox{
  .q-btns{
    padding: 20px 0;
    line-height: 1;
    box-shadow: none;
    font-weight: normal;
    img{
      width: 24px;
      height: 24px;
      margin-bottom: 13px;
    }
    span{
      width:100%;
      font-size: 13px;
      color: rgb(51, 51, 51)
    }
  }
}
// 新手任务
.newList{
  padding: 13px;
  .nTit{
    font-size: 16px;
    font-weight:bold;
    line-height: 1;
    color:rgb(51, 51, 51);
    }
  .listItem{
    margin-top: 20px;
    align-items: center;
    .q-avatar{
      width: 25px;
      height: 30px;
      border-radius: 0%;
    }
    .q-avatar img{
      width: 23px;
      height: 23px;
    }
    >.col-8{
      padding-left: 10px;
      .itemName{
        line-height: 1;
        font-size: 13px;
        color: rgb(51, 51, 51);
      }
      .itemReward{
        line-height: 1;
        font-size: 12px;
        color: rgb(255, 90, 61);
        margin-top: 10px;
      }
    }
    .q-btn{
      width: 70px;
      height: 30px;
      min-height: 0;
      padding:0;
      border-radius:21px;
      box-shadow: none;
      border:1px solid #ff853a;
      color:#ff853a;
      font-size:12px;
      vertical-align: unset;
    }
    .q-btn.off{
      border: 1px solid rgb(153,153,153)!important;
      color: rgb(153,153,153)!important;
    }
  }
}
</style>

<template>
  <q-layout class="animated fadeIn" style="background:#f2f2f2;" view="lHh Lpr lFf">
    <section class="margin15">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
      >
        <q-carousel-slide v-for="item in barlist" :key="item.id" :name="item.id" :img-src="item.imgUrl" ></q-carousel-slide>
      </q-carousel>
      <div class="row siBtnBox">
        <q-btn class="col q-btns" @click="to(1)">
          <img src="statics/newbron/new1.png" alt="">
          <span>邀请有礼</span>
        </q-btn>
        <q-btn class="col q-btns" @click="to(3)">
          <img src="statics/newbron/new4.png" alt="">
          <span>新手指南</span>
        </q-btn>
        <q-btn class="col q-btns" @click="startPage">
          <img src="statics/newbron/new2.png" alt="">
          <span>每日任务</span>
        </q-btn>
        <q-btn class="col q-btns" @click="to(2)">
          <img src="statics/newbron/new3.png" alt="">
          <span>领佣金券</span>
        </q-btn>
      </div>
    </section>
    <section class="margin15 marTop0 animated fadeIn">
      <div class="newList">
        <p class="nTit">新手任务</p>
        <div v-for="contact in dataInfo" :key="contact.id" class="row listItem">
          <q-avatar class="col">
            <img class="newic" :src="contact.icon">
          </q-avatar>
          <div class="row col-8">
            <div class="col-12 itemName">{{contact.name}}</div>
            <div class="col-12 itemReward">奖励：{{contact.reward}}金币</div>
          </div>
          <q-btn class="off" v-if="contact.btname=='已领取'" @click="pull(contact.btname,contact.url)">{{ contact.btname }}</q-btn>
          <q-btn v-else @click="pull(contact.btname,contact.url)">{{ contact.btname }}</q-btn>
        </div>
      </div>
    </section>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      dataInfo: [],
      barlist: []
    }
  },
  created () {
    if (this.$store.state.user.info) {
      var timestamp = (new Date()).getTime()
      var date = (new Date(this.$store.state.user.info.create_time)).getTime()
      if ((date + 86400 * 15 * 1000) < timestamp) {
        this.$router.push({ path: '/task/hall/task' })
        return false
      }
    }
    this.$http.post('app/PromotionTask/newlist', {}, (res) => {
      this.dataInfo = res.data
    })
    this.$http.post('app/Carousel/firstbar', {}, (res) => {
      this.barlist = res.data
      this.slide = res.data[0].id
    })
  },
  methods: {
    startPage () {
      this.$router.push({ path: '/taskcenter' })
    },
    to (val) {
      if (val === 1) {
        this.$router.push({ path: '/Invit' })
      } else if (val === 2) {
        this.$router.push({ path: '/Ticket/neckline' })
      } else if (val === 3) {
        this.$router.push({ path: '/Goldmall/guide' })
      }
    },
    pull (name, url) {
      if (name === '已领取') {
        return false
      } else {
        this.$router.push({ path: url })
      }
    }
  }
}
</script>
