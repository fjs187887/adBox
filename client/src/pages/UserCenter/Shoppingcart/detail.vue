<template>
  <div>
    <div class="row head">
      <div class="row" style="width: 100%;padding: 20px 0">
        <div class="col-3 tou">
          <span v-if="userinfo.avatar"><img class="imgt" :src="userinfo.avatar" ></span>
          <span v-else><img class="imgt" src="../../../statics/user/avatar.png" ></span>
        </div>
        <div class="row col-7">
          <div class="row col-4 zunumber">
            <span class="col-12 number" @click="gotask()" v-if="userinfo.taskcount">{{userinfo.taskcount}}</span>
            <span class="col-12 number" @click="gotask()" v-else>0</span>
            <span class="col-12 number">任务</span>
          </div>
          <div class="row col-4 zunumber">
            <span class="col-12 number" @click="gofan()" v-if="userinfo.count">{{userinfo.fanscount}}</span>
            <span class="col-12 number" @click="gofan()" v-else>0</span>
            <span class="col-12 number">粉丝</span>
          </div>
          <div class="row col-4 zunumber">
            <span class="col-12 number" @click="govisitor()" v-if="userinfo.visitorcount">{{userinfo.visitorcount}}</span>
            <span class="col-12 number" @click="govisitor()" v-else>0</span>
            <span class="col-12 number">访客</span>
          </div>
        </div>
      </div>
      <div class="col-12 introduction">
        <div>
          认证：<span>{{contact.name}}</span>
        </div>
        <div class="row int">
          简介：<span class="col">{{userinfo.auth_introduction}}</span>
          <q-btn class="col-2" flat align="right" @click="introduction(userinfo.auth_introduction)"  icon="launch"></q-btn>
        </div>
        <div class="row int">
          主营业务：<span class="col">{{contact.main_business}}</span>
          <q-btn class="col-2" flat align="right"  @click="main_business(contact.main_business)" icon="launch"></q-btn>
        </div>
      </div>
      <div class="col-12 border1"></div>
    </div>
    <div class="row">
      <div class="col-12 introduction">
        <div class="row int">
          <span class="col">私信消息</span> <q-btn flat  align="right"  @click="gomessage()" icon="keyboard_arrow_right" class="col-2"></q-btn>
        </div>
        <div class="border2"></div>
        <div class="row int">
          <span class="col">任务查看</span> <q-btn flat  align="right" @click="gotask()" icon="keyboard_arrow_right" class="col-2"></q-btn>
        </div>
        <div class="border2"></div>
        <div class="row int">
          <span class="col">粉丝管理</span> <q-btn flat  align="right" @click="gofan()" icon="keyboard_arrow_right" class="col-2"></q-btn>
        </div>
        <div class="border2"></div>
        <div class="row int">
          <span class="col">访客统计</span> <q-btn flat  align="right" @click="govisitor()" icon="keyboard_arrow_right" class="col-2"></q-btn>
        </div>
        <div class="border2"></div>
      </div>
    </div>
<!--    <div class="row">-->
<!--      <div class="col-12 introduction">-->
<!--        <div style="font-size: 16px" class="int">-->
<!--          增值功能-->
<!--        </div>-->
<!--        <div class="row int">-->
<!--          <span class="col">热文推</span> <q-btn flat  align="right"  icon="keyboard_arrow_right" class="col-2"></q-btn>-->
<!--        </div>-->
<!--        <div class="border2"></div>-->
<!--        <div class="row int">-->
<!--          <span class="col">营销红包</span> <q-btn flat  align="right"  icon="keyboard_arrow_right" class="col-2"></q-btn>-->
<!--        </div>-->
<!--        <div class="border2"></div>-->
<!--      </div>-->
<!--    </div>-->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">简介</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="auth_introduction" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" @click="cancel()" />
          <q-btn flat label="确定" @click="submit(auth_introduction)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="prompt1" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">主营业务</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="main_business1" autofocus @keyup.enter="prompt1 = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" @click="cancel1()" />
          <q-btn flat label="确定" @click="submitmain(main_business1)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      contact: '',
      userinfo: '',
      prompt: false,
      prompt1: false,
      auth_introduction: '',
      main_business1: ''
      // address: ''
    }
  },
  inject: ['registerRightComponent', 'setTitle'],
  mounted () {
  },
  created () {
    this.getinfo()
    this.userinfos()
  },
  methods: {
    gomessage () {
      this.$router.push({ path: '/message/user/:uid' })
    },
    introduction () {
      this.prompt = true
    },
    main_business () {
      this.prompt1 = true
    },
    cancel () {
      this.prompt = false
    },
    cancel1 () {
      this.prompt1 = false
    },
    userinfos () {
      this.$http.post('app/business/userinfo', (res) => {
        if (res.code === 0) {
          this.userinfo = res.data
          this.auth_introduction = this.userinfo.auth_introduction
          this.setTitle(this.userinfo.nickname)
        } else {
        }
      })
    },
    submit (data) {
      this.$http.post('app/business/introduction', { auth_introduction: data }, (res) => {
        if (res.code === 0) {
          this.$toast.success('修改成功')
          this.prompt = false
          this.userinfos()
        } else {
          this.$toast.fail('修改失败')
        }
      })
    },
    submitmain (data) {
      this.$http.post('app/business/revise', { main_business: data }, (res) => {
        if (res.code === 0) {
          this.$toast.success('修改成功')
          this.prompt1 = false
          this.getinfo()
        } else {
          this.$toast.fail('修改失败')
        }
      })
    },
    gotask () {
      this.$router.push({ path: '/userreleasetask' })
    },
    gofan () {
      this.$router.push({ path: 'fan' })
    },
    govisitor () {
      this.$router.push({ path: 'visitors' })
    },
    getinfo () {
      this.$http.post('app/business/business_info', (res) => {
        if (res.code === 0) {
          this.contact = res.data
          this.main_business1 = this.contact.main_business
        } else {
        }
      })
    }
  }
}
</script>
<style scoped>
  .img{
    margin: 15px 20px;
  }
  .tou{
    padding: 0 25px;
  }
  .imgt{
    /*margin: 30px 25px;*/
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .zunumber{
    text-align: center;
    /*margin: 35px 20px;*/
  }
  .number{
    margin: 0 8px;
  }
  .introduction{
    padding: 0 30px;
  }
  .border1{
    border-bottom: #eeeeee 10px solid;
  }
  .border2{
    border-bottom: #eeeeee 1px solid;
  }
  .int{
    margin: 10px 0;
    height: 50px;
    line-height: 50px;
  }
  .button{
    padding-left: 300px;
  }
</style>
