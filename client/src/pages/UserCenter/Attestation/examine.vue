<style lang="less" scoped>
.topStatus{ // 顶部北京栏
  width: 100%;
  padding: 20px 15px;
  background-color: #ff853a;
  h5{
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    line-height: 1;
    margin-bottom: 15px;
  }
  p{
    font-size: 12px;
    line-height: 1;
    color: #fff;
  }
}
.cenList{
  padding: 20px 15px;
  p{
    font-size: 15px;
    color: #333;
    line-height: 1;
  }
  .item{
    /deep/.q-field__control{
      margin-top: 25px;
      font-size: 13px;
      height: 27px!important;
      &::before{
        display: none;
      }
      /deep/.q-field__native.q-placeholder{
        color: #666;
      }
    }
  }
}
.bottomImg{
  padding: 20px 0 40px;
  p{
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 25px;
  }
  .q-img{
    width: 250px;
    height: 150px;
    display: block;
    margin: 0 auto;
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <!-- 企业认证 -->
    <div v-if="enterprise">
      <div class="topStatus">
        <h5>{{ shenhe }}</h5>
        <!-- <p>提交时间：{{ create_time }}</p> -->
        <p>{{ info }}</p>
      </div>
      <div class="cenList">
        <p>认证信息</p>
        <div class="item col">
          <q-input v-model="name" readonly />
          <q-input v-model="industry" readonly />
          <q-input v-model="address" readonly/>
          <q-input v-model="license" readonly/>
          <q-input v-model="handle" readonly/>
          <q-input v-model="handlePhone" readonly/>
        </div>
      </div>
      <div class="bottomImg">
        <p>营业执照</p>
        <q-img
          :src="front_photo"
          :ratio="16/9"
        />
      </div>
    </div>
    <!-- 个人认证 -->
    <div v-else>
      <div class="topStatus">
        <h5>{{ shenhe }}</h5>
        <!-- <p>提交时间：{{ create_time }}</p> -->
        <p>{{ info }}</p>
      </div>
      <div class="cenList">
        <p>认证信息</p>
        <div class="item col">
          <q-input v-model="nickName" readonly />
          <q-input v-model="idCard" readonly/>
          <q-input v-model="industry" readonly />
        </div>
      </div>
      <div class="bottomImg">
        <p>身份证正面</p>
        <q-img
          :src="front_photo"
          :ratio="16/9"
        />
        <p>身份证反面</p>
        <q-img
          :src="back_photo"
          :ratio="16/9"
        />
        <p>手持身份证照片</p>
        <q-img
          :src="hold_photo"
          :ratio="16/9"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      front_photo: '',
      back_photo: '',
      hold_photo: '',
      enterprise: false,
      name: '公司名称：',
      address: '公司地址：',
      license: '执照代码：',
      handle: '经办人：',
      handlePhone: '经办人电话：',
      nickName: '姓名：',
      idCard: '身份证号：',
      info: '预计1-3个工作日完成审核',
      create_time: '',
      shenhe: '审核中',
      industry: '行业分类：'
    }
  },
  inject: ['setTitle', 'registerLeftComponent'],
  created () {
    this.registerLeftComponent(() => {
      this.$router.push({ path: '/user' })
    })
    this.$http.post('app/UserAuthentication/check_isauth', {}, (res) => {
      var data = res.data
      this.create_time = data.data.create_time
      this.industry = this.industry + data.industry
      if (data.data.type === 1) {
        this.enterprise = true
        this.name = this.name + data.data.name
        this.address = this.address + data.data.auth_entity_address
        this.license = this.license + data.data.credentials_number
        this.handle = this.handle + data.data.auth_operator
        this.handlePhone = this.handlePhone + data.data.auth_operator_phone
        this.front_photo = data.data.credentials_front_photo
      } else {
        this.nickName = this.nickName + data.data.name
        this.idCard = this.idCard + data.data.credentials_number
        this.front_photo = data.data.credentials_front_photo
        this.back_photo = data.data.credentials_back_photo
        this.hold_photo = data.data.credentials_hold_photo
      }
      if (data.data.audit_status === 0) {
        this.setTitle('待审核')
      } else if (data.data.audit_status === 1) {
        this.setTitle('审核未通过')
        this.shenhe = '审核未通过'
      } else if (data.data.audit_status === 2) {
        this.setTitle('已认证')
        this.info = '完成认证，可以发任务了'
        this.shenhe = '已认证'
      }
    })
  }
}
</script>
