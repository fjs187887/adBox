<template>
  <div>
    <div v-if="enterprise">
      <div class="q-pa-md" style="border-bottom: 5px solid rgb(238, 238, 238);">
        <div class="row">
          <div class="col-5">
            <p><q-icon :name="tubiao" style="font-size:50px;" />{{ shenhe }}</p>
          </div>
          <div class="col-7">
            <p>提交时间：{{ create_time }}</p>
            <p style="color:red;">{{ info }}</p>
          </div>
        </div>
      </div>
      <div class="q-pa-md" >
        <div class="col" style="border-left: 2px solid #666;">
          &nbsp;认证信息
        </div>
        <div class="col" style="padding: 10px">
          <q-input v-model="name" readonly />
          <q-input v-model="address" readonly/>
          <q-input v-model="license" readonly/>
          <q-input v-model="handle" readonly/>
          <q-input v-model="handlePhone" readonly/>
        </div>
      </div>
      <div class="col" style="font-size: 14px;text-align: center;padding: 0px 40px;">
        营业执照
        <q-img
          :src="front_photo"
          :ratio="16/9"
          style="margin-top: 10px;margin-bottom: 10px;"
        />
      </div>
    </div>
    <div v-else>
      <div class="q-pa-md" style="border-bottom: 5px solid rgb(238, 238, 238);">
        <div class="row">
          <div class="col-5">
            <p><q-icon :name="tubiao" style="font-size:50px;" />{{ shenhe }}</p>
          </div>
          <div class="col-7">
            <p>提交时间：{{ create_time }}</p>
            <p style="color:red;">{{ info }}</p>
          </div>
        </div>
      </div>
      <div class="q-pa-md" >
        <div class="col" style="border-left: 2px solid #666;">
          &nbsp;认证信息
        </div>
        <div class="col" style="padding: 10px">
          <q-input v-model="nickName" readonly />
          <q-input v-model="idCard" readonly/>
        </div>
      </div>
      <div class="col" style="font-size: 14px;text-align: center;padding: 0px 40px;">
        身份证正面
        <q-img
          :src="front_photo"
          :ratio="16/9"
          style="margin-top: 10px;margin-bottom: 10px;"
        />
        身份证反面
        <q-img
          :src="back_photo"
          :ratio="16/9"
          style="margin-top: 10px;margin-bottom: 10px;"
        />
        手持身份证照片
        <q-img
          :src="hold_photo"
          :ratio="16/9"
          style="margin-top: 10px;margin-bottom: 10px;"
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
      tubiao: 'assignment'
    }
  },
  inject: ['setTitle'],
  mounted () {
    this.$http.post('app/UserAuthentication/check_isauth', {}, (res) => {
      console.log(res)
      this.create_time = res.data.create_time
      if (res.data.type === 1) {
        this.enterprise = true
        this.name = this.name + res.data.name
        this.address = this.address + res.data.auth_entity_address
        this.license = this.license + res.data.credentials_number
        this.handle = this.handle + res.data.auth_operator
        this.handlePhone = this.handlePhone + res.data.auth_operator_phone
        this.front_photo = res.data.credentials_front_photo
      } else {
        this.nickName = this.nickName + res.data.name
        this.idCard = this.idCard + res.data.credentials_number
        console.log(res.data.credentials_front_photo)
        this.front_photo = res.data.credentials_front_photo
        this.back_photo = res.data.credentials_back_photo
        this.hold_photo = res.data.credentials_hold_photo
      }
      if (res.data.audit_status === 0) {
        this.setTitle('待审核')
      } else if (res.data.audit_status === 1) {
        this.setTitle('审核未通过')
        this.shenhe = '审核未通过'
        this.tubiao = 'assignment_late'
      } else if (res.data.audit_status === 2) {
        this.setTitle('已认证')
        this.info = '完成认证，可以发任务了'
        this.shenhe = '已认证'
        this.tubiao = 'assignment_turned_in'
      }
    })
  }
}
</script>
<style>
  p{
    line-height: 25px;
  }
</style>
