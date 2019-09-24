<style lang="less" scoped>
.formBox{
  padding: 0 15px;
  .q-input{
    position: relative;
    font-size: 13px;
    color: #333;
    padding: 0;
    caret-color: #ff853a;
    /deep/.q-field__native{
      padding-left: 90px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
    // label
  /deep/.q-field__label{
    transform: unset!important;
    width: 38%;
    font-size: 13px;
    color:#333;
  }
  /deep/.q-field__native .q-placeholder{
    float: right;
  }
    // 下边框
  /deep/.q-field__control::after{
    background: transparent!important;
  }
  /deep/.q-field__control::before{
    border-bottom: transparent!important;
  }
  // 错误提示
  /deep/.q-field__messages.col{
    display: none;
  }
// 上传
  .uploadBox{
    padding-top: 45px;
    .upItemTit{
      font-size: 15px;
      text-align: center;
      color: #666;
    }
    .upItem{
      margin-top: 40px;
      text-align: center;
      .upSfz{
        margin-top: 20px;
        height: 200px;
        img{
          height:200px;
          max-height: 200px;
        }
      }
    }
  }
}
.up-ma{
  position: relative;
  margin-top: 40px;
}
.submitBox{
  padding: 20px 15px;
  .q-btn{
    width: 100%;
    height: 40px;
  }
}
.q-dialog{
  padding-top: 15px;
  .cardBox{
    position: relative;
    .cardPabt{
      padding-bottom: 50px;
    }
  }
  .d-btnBox{
    position: absolute;
    bottom: 3.5%;
    height: 45px;
    width: 87%;
    box-shadow: 0px -1px 3px #e6e6e6;
    background: #fff;
    .col-6{
      padding: 5px 20px;
      .q-btn{
        height: 35px;
        width: 100%;
      }
    }
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="formBox">
      <q-input class="btBorder" v-model="name" label="公司名称：" placeholder="请输入营业执照上面的企业名称" :rules="[val => !!val || '请输入公司名称']"/>
      <q-input class="btBorder" v-model="industry" label="所属行业：" placeholder="请选择行业" readonly @click.native="hangye"/>
      <q-input class="btBorder" v-model="address" label="公司地址：" placeholder="请输入营业执照上面的企业地址" :rules="[val => !!val || '请输入公司地址']"/>
      <q-input class="btBorder" v-model="license" label="执照代码：" placeholder="请输入营业执照上面的社会统一信用代码" :rules="[val => !!val || '请输入执照代码']"/>
      <q-input class="btBorder" v-model="handle" label="经办人：" placeholder="请输入经办人姓名" :rules="[val => !!val || '请输入经办人姓名']"/>
      <q-input class="btBorder" v-model="handlePhone" label="经办人电话：" placeholder="请输入经办人手机号码" type="number" :rules="[val => !!val || '请输入经办人电话']"/>
      <div class="uploadBox">
        <div class="upItemTit">上传营业执照</div>
        <div class="upItem">
          <upload
          label="上传营业执照"
          color="primary"
          flat
          bordered
          hide-upload-btn
          auto-upload
          @uploaded="(e)=>{uploaded(e,1)}"
          field-name="image"
          ref="zm"
          @added="added(1)"
          style="width: 100%;"
          />
        </div>
      </div>
    </div>
    <!-- 线 提交 -->
    <div class="btBorder up-ma"></div>
    <div class="submitBox">
      <q-btn rounded color="primary" :loading="loading" unelevated label="确认提交" @click="confirmOk"/>
    </div>
    <!-- 广告弹框 -->
    <q-dialog
      v-model="fullHeight"
    >
      <q-card class="cardBox column full-height">
        <q-card-section class="row cardPabt">
          <div class="col-6" v-for="item in industrylist" :key="item.id">
            <q-checkbox v-model="selection" :val="item.name" :label="item.name" color="teal" @input="changebox"/>
          </div>
        </q-card-section>
      </q-card>
      <div class="d-btnBox row">
        <div class="col-6">
          <q-btn outline rounded color="primary" label="清空" style="width: 100%;" @click="emptys"/>
        </div>
        <div class="col-6">
          <q-btn unelevated rounded color="primary" label="确定" style="width: 100%;" v-close-popup @click="confirm"/>
        </div>
      </div>
    </q-dialog>
  </div>
</template>
<script>
import upload from '../../../components/upload'
export default {
  components: { upload },
  data () {
    return {
      name: '',
      address: '',
      license: '',
      handle: '',
      handlePhone: '',
      permit: {},
      fullHeight: false,
      industry: '',
      selection: [],
      industrylist: [],
      relselect: [],
      loading: false
    }
  },
  inject: ['setTitle'],
  created () {
    this.setTitle('企业认证')
    this.$http.post('app/UserAuthentication/checksta', {}, (res) => {
      if (res.data === 1) {
        this.$router.push({ 'path': 'examine' })
      }
    })
  },
  mounted () {
    this.$http.post('app/UserAuthentication/industry', {}, (res) => {
      this.industrylist = res.data
    })
  },
  methods: {
    onRead (file) {
      this.$refs.sfzZm.src = file.content
    },
    confirmOk () {
      if (!this.name || !this.address || !this.license || !this.handle) {
        this.$toast.fail('必填项不能为空')
        return false
      }
      if (this.relselect.length === 0) {
        this.$toast.fail('请选择行业分类')
        return false
      }
      if (!(/^1[3456789]\d{9}$/.test(this.handlePhone))) {
        this.$toast.fail('手机号码有误，请重新填写')
        return false
      }
      if (!this.permit.path) {
        this.$toast.fail('请上传营业执照')
        return false
      }
      this.loading = true
      this.$http.post('app/UserAuthentication/okenterprise', { name: this.name, credentials_number: this.license, auth_entity_address: this.address, auth_operator: this.handle, auth_operator_phone: this.handlePhone, credentials_front_photo: this.permit, industry: this.selection }, (res) => {
        if (res.code === 0) {
          this.$toast.success({
            message: '提交成功',
            onClose: () => {
              this.$router.push({ path: 'examine' })
            }
          })
        } else {
          this.$toast.fail(res.msg)
          this.loading = false
        }
      })
    },
    // 上传完成
    uploaded (res, type) {
      if (JSON.parse(res.xhr.response).code === 0) {
        var data = { 'path': JSON.parse(res.xhr.response).data.path, 'file_name': JSON.parse(res.xhr.response).data.file_name }
        if (type === 1) {
          this.permit = data
        }
      }
    },
    // 文件添加到列表时
    added (type) {
      if (type === 1) {
        this.$refs.zm.removeUploadedFiles()
      }
    },
    // 选择行业
    hangye () {
      this.fullHeight = true
    },
    changebox (val) {
      if (val.length === 3) {
        this.relselect = val
      }
      if (val.length > 3) {
        this.$toast.fail('最多选择三个哦~')
        this.selection = this.relselect
      }
    },
    emptys () {
      this.selection = this.relselect = []
    },
    confirm () {
      this.industry = ''
      if (this.selection.length > 0) {
        this.selection.map((e) => {
          this.industry += e + '/'
        })
      } else {
        this.industry = ''
      }
    }
  }
}
</script>
