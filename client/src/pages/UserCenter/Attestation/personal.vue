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
}
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
</style>

<template>
  <div class="animated fadeIn">
    <div class="formBox">
      <q-input class="btBorder" v-model="nickName" label="输入姓名：" placeholder="请输入姓名" :rules="[val => !!val || '请输入姓名']"/>
      <q-input class="btBorder" maxlength="18" v-model="idCard" label="身份证号：" placeholder="请输入身份证号" :rules="[val => !!val || '请输入身份证号']"/>
      <q-input class="btBorder" v-model="industry" label="所属行业：" placeholder="请选择行业" readonly @click.native="hangye"/>
      <div class="uploadBox">
        <div class="upItemTit">上传身份证</div>
        <div class="upItem">
          <!-- <uploader class="upSfz"
                    ref="zm"
                    :after-read="(e)=>{onRead(e,1)}"
                    accept="image/*"
                    preview-image
                    >
            <img src="statics/UserCenter/Attestation/3.png" ref="sfzZm" alt="">
          </uploader> -->
          <upload
            flat
            bordered
            class="upload"
            label="上传身份证正面"
            color="primary"
            hide-upload-btn
            auto-upload
            @uploaded="(e)=>{uploaded(e,1)}"
            field-name="image"
            ref="zm"
            @added="added(1)"
            style="width: 100%;"
          />
        </div>
        <div class="upItem">
          <!-- <uploader class="upSfz"
                    ref="fm"
                    preview-image
                    :after-read="(e)=>{onRead(e,2)}"
                    accept="image/*"
                    >
            <img src="statics/UserCenter/Attestation/1.png" ref="sfzFm" alt="">
          </uploader> -->
          <upload
            flat
            bordered
            label="上传身份证反面"
            color="primary"
            auto-upload
            @uploaded="(e)=>{uploaded(e,2)}"
            field-name="image"
            ref="fm"
            @added="added(2)"
            style="width: 100%;"
          />
        </div>
        <div class="upItem">
          <!-- <uploader class="upSfz"
                    ref="sc"
                    :after-read="(e)=>{onRead(e,3)}"
                    preview-image
                    accept="image/*">
            <img src="statics/UserCenter/Attestation/2.png" ref="sfzSc" alt="">
          </uploader> -->
          <upload
            flat
            bordered
            label="手持身份证"
            color="primary"
            hide-upload-btn
            auto-upload
            @uploaded="(e)=>{uploaded(e,3)}"
            field-name="image"
            ref="sc"
            @added="added(3)"
            style="width: 100%;"
          />
        </div>
      </div>
    </div>
    <!-- 线 提交 -->
    <div class="btBorder up-ma"></div>
    <div class="submitBox">
      <q-btn rounded color="primary" unelevated label="确认提交" @click="confirmOk" :loading="loading"/>
    </div>
    <!-- 广告弹框 -->
    <q-dialog
      v-model="fullHeight"
    >
      <q-card class="cardBox column full-height">
        <q-card-section class="row cardPabt">
          <div class="col-6" v-for="item in industrylist" :key="item.id">
            <q-checkbox v-model="selection" :val="item.name" :label="item.name" color="primary" @input="changebox"/>
          </div>
        </q-card-section>
      </q-card>
        <div class="d-btnBox row">
          <div class="col-6">
            <q-btn outline rounded color="primary" label="清空" @click="emptys"/>
          </div>
          <div class="col-6">
            <q-btn unelevated rounded color="primary" label="确定" v-close-popup @click="confirm"/>
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
      nickName: '',
      idCard: '',
      frontCard: {},
      reverseCard: {},
      handCard: {},
      industry: '',
      fullHeight: false,
      industrylist: [],
      selection: [],
      relselect: [],
      loading: false
    }
  },
  inject: ['setTitle'],
  created () {
    this.$http.post('app/UserAuthentication/checksta', {}, (res) => {
      if (res.data === 1) {
        this.$router.push({ 'path': 'examine' })
      }
    })
  },
  mounted () {
    this.setTitle('个人认证')
    this.$http.post('app/UserAuthentication/industry', {}, (res) => {
      this.industrylist = res.data
    })
  },
  methods: {
    // 2 上传完成
    uploaded (res, type) {
      // console.log(res.xhr.response)
      if (JSON.parse(res.xhr.response).code === 0) {
        var data = { 'path': JSON.parse(res.xhr.response).data.path, 'file_name': JSON.parse(res.xhr.response).data.file_name }
        if (type === 1) {
          this.frontCard = data
        } else if (type === 2) {
          this.reverseCard = data
        } else if (type === 3) {
          this.handCard = data
        }
      }
    },
    // 1 文件添加到列表时
    added (type) {
      // console.log(type)
      if (type === 1) {
        this.$refs.zm.removeUploadedFiles()
      } else if (type === 2) {
        console.log(this.$refs.fm.removeUploadedFiles())
        this.$refs.fm.removeUploadedFiles()
      } else if (type === 3) {
        this.$refs.sc.removeUploadedFiles()
      }
    },
    onRead (file, detail) {
      if (detail === 1) {
        this.$refs.sfzZm.src = file.content
      } else if (detail === 2) {
        this.$refs.sfzFm.src = file.content
      } else if (detail === 3) {
        this.$refs.sfzSc.src = file.content
      }
    },
    confirmOk () {
      if (!this.nickName || !this.idCard || !this.frontCard || !this.reverseCard || !this.handCard) {
        this.$toast.error('必填项不能为空')
        return false
      }
      if (this.selection.length === 0) {
        this.$toast.error('请选择行业分类')
        return false
      }
      if (this.selection.length < 3) {
        this.$toast.error('行业最少选择3个')
        return false
      }
      if (!this.frontCard.path || !this.reverseCard.path || !this.handCard.path) {
        this.$toast.error('请上传认证照片')
        return false
      }
      this.loading = true
      this.$http.post('app/UserAuthentication/okperson', { name: this.nickName, credentials_number: this.idCard, credentials_front_photo: this.frontCard, credentials_back_photo: this.reverseCard, credentials_hold_photo: this.handCard, industry: this.selection }, (res) => {
        if (res.code === 0) {
          this.$toast.success({
            content: '提交成功',
            onClose: () => {
              this.$router.push({ path: 'examine' })
            }
          })
        } else {
          this.$toast.error(res.msg)
          this.loading = false
        }
      })
    },
    hangye () {
      this.fullHeight = true
    },
    changebox (val) {
      if (val.length === 3) {
        this.relselect = val
      }
      if (val.length > 3) {
        this.$toast.error('最多选择三个哦')
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
