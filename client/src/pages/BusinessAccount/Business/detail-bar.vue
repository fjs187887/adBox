<style scoped lang="less">
// 头
.head{
  padding: 30px 15px;
  .avatarBox{
    overflow: hidden;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 12px;
    img{
      width:100%;
    }
  }
  .nameBox{
    color: #333;
    div{
      padding-top: 5px;
      font-size: 14px;
      font-weight: 600;
      padding-bottom: 3px;
    }
    p{
      font-size: 12px;
      margin-top:10px;
      .q-btn{
        padding: 0;
        min-height: 0;
        /deep/.q-icon{
          font-size: 11px!important;
        }
      }
    }
  }
  // 数量
  .numBox{
    margin-top: 40px;
    .zunumber{
      color: #333;
      p{
        text-align: center;
        font-size: 13px;
      }
      .number{
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: 600;
      }
    }
    .LRborder{
      position: relative;
      &:before{
        content: '';
        height: 80%;
        position: absolute;
        bottom: 10%;
        left: 0;
        border-right: 1px solid #e6e6e6!important;
        transform: scaleX(0.5)!important;
      }
      &:after{
        content: '';
        height: 80%;
        position: absolute;
        bottom: 10%;
        right: 0;
        border-right: 1px solid #e6e6e6!important;
        transform: scaleX(0.5)!important;
      }
    }
  }
  // 按钮
  .btnBox{
    margin-top:30px;
    text-align: center;
    .btnItem{
      text-align: center;
      margin: 0 auto;
      .q-btn{
        width: 150px;
        height: 40px;
        font-size: 14px;
        color: #fff;
        font-weight: normal;
        transition: none!important;
      }
      .qxBtn{
        border: 1px solid rgb(152,157,166);
        color: rgb(152,157,166)!important;
      }
    }
  }
}
// 内容
.q-tabs-c{
  padding: 0 15px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  height: 45px;
  .q-tab{
    font-size: 15px;
    padding: 0;
    min-height: 0;
    transition: all .1s;
    text-align: left;
    height: 45px;
    line-height: 34px;
    margin-right: 20px;
    flex: unset;
    color: #666;
    display: table-cell;
    vertical-align: bottom;
  }
  /deep/.q-tab--active{
    font-size: 15px;
    color: #000;
  }
}
.q-page-container{
  padding-top: 0!important;
}
</style>

<template>
  <div class="animated">
    <!-- 头 -->
    <div class="head">
      <!-- 头像 名称简介 -->
      <div class="row">
        <div class="col-4 avatarBox">
          <span v-if="contact.avatar"><img :src="contact.avatar"></span>
          <span v-else><img src="../../../statics/user/avatar.png"></span>
        </div>
        <div class="col-8 nameBox">
          <div>
            认证：<span>{{contact.name}}</span>
          </div>
          <p>
            简介：<span>{{contact.auth_introduction}}</span>
          </p>
          <p>
            主营业务：<span>{{contact.main_business}}</span>
          </p>
        </div>
      </div>
      <!-- 数量 -->
      <div class="row numBox">
        <div class="col-4 zunumber">
          <p class="col-12 number"  v-if="contact.taskcount">{{contact.taskcount}}</p>
          <p class="col-12 number"  v-else>0</p>
          <p class="col-12">任务</p>
        </div>
        <div class="col-4 zunumber LRborder">
          <p class="col-12 number"  v-if="contact.fanscount">{{contact.fanscount}}</p>
          <p class="col-12 number"  v-else>0</p>
          <p class="col-12">粉丝</p>
        </div>
        <div class="col-4 zunumber">
          <p class="col-12 number"  v-if="contact.visitorcount">{{contact.visitorcount}}</p>
          <p class="col-12 number"  v-else>0</p>
          <p class="col-12">访客</p>
        </div>
      </div>
      <!-- <div class="col-12 introduction">
        <div>
          认证：<span v-if="contact.type == 1">{{contact.name}}</span><span v-else>个人认证</span>
        </div>
        <div class="row int">
          简介：<span>{{contact.auth_introduction}}</span>
        </div>
        <div class="row int">
          主营业务：<span>{{contact.main_business}}</span>
        </div>
      </div> -->
      <!-- 按钮 -->
      <div class="row btnBox">
        <div class="btnItem" v-if="contact.isfans==1">
          <q-btn class="bg-primary text-white" flat @click="chat()">发送消息</q-btn>
        </div>
        <div class="btnItem">
          <span v-if="contact.isfans==0">
            <q-btn class="bg-primary text-white btn-with" flat @click="gofans()">关注</q-btn>
          </span>
          <span v-else>
            <q-btn class="qxBtn" flat @click="delfans()">取消关注</q-btn>
          </span>
        </div>
      </div>
    </div>
    <!-- 线 -->
    <div class="line"></div>
    <!-- 内容bar -->
    <q-tabs class="q-tabs-c" v-model="tab" align="left" indicator-color="transparent" active-color="#000" @input="show=true">
      <q-tab active-class="active" name="1" @click="startPage('/detailtask')">分享广告</q-tab>
      <q-tab active-class="active" name="2" @click="startPage('/detailmini')">小任务</q-tab>
      <q-tab active-class="active" name="3" @click="startPage('/detailteam')">团队任务</q-tab>
    </q-tabs>
    <!-- 内容 -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </div>
</template>
<script>
export default {
  inject: ['setTitle'],
  filters: {
    btnName (model) {
      switch (model) {
        case 1:
          return '分享赚钱'
        case 2:
          return '领取任务'
        case 3:
          return '创建'
      }
    }
  },
  data () {
    return {
      tab: '1',
      contact: '',
      uid: '',
      model: 1
    }
  },
  created () {
    this.uid = this.$route.query.id
    this.getbuessinfo()
  },
  methods: {
    startPage (path) {
      this.$router.replace({ path: '/businessaccount' + path, query: { id: this.uid } })
    },
    chat () {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(this.uid)
      console.log(this.$store.state.user.info.id)
      if (this.uid === this.$store.state.user.info.id + '') {
        this.$toast.fail('您不能给自己发送消息')
      } else {
        this.$router.push(`/message/${this.contact.session_id}`)
      }
    },
    getbuessinfo () {
      this.$http.post('app/Business/business_info', { uid: this.uid }, (res) => {
        if (res.code === 0) {
          // this.contact.main_business = res.data.main_business
          // this.contact.type = res.data.type
          // this.contact.name = res.data.name
          this.contact = res.data
          this.setTitle(this.contact.nickname)
        }
      })
    },
    fanscountInc () {
      this.$http.post('app/UserFans/fanscountInc', { uid: this.conatct.id }, (res) => {
      })
    },
    gofans () {
      this.$http.post('app/UserFans/add', { uid: this.contact.id }, (res) => {
        if (res.code === 0) {
          this.$toast.success('关注成功')
          this.contact.isfans = 1
          this.contact.fanscount = this.contact.fanscount + 1
        } else {
          this.$toast.fail({
            message: res.msg
          })
        }
      })
    },
    delfans () {
      this.$http.post('app/UserFans/delfans', { uid: this.contact.id }, (res) => {
        if (res.code === 0) {
          this.$toast.success('取消关注成功')
          this.contact.isfans = 0
          this.contact.fanscount = this.contact.fanscount - 1
        } else {
          this.$toast.fail({
            message: res.msg
          })
        }
      })
    }
  }
}
</script>
