<style scoped lang="less">
/deep/.van-field__control:disabled{
  // vant disabled
  color: #333;
}
/deep/.van-picker-column{
  // vant弹框字体
  font-size: 13px;
}
  .container {
    .itemList{
      padding: 0 15px;
      .btBorder{position: relative;}
      .sideTxt{
        padding: 20px 0;
        font-size:14px;
        font-weight: 600;
        color: #333;
      }
      // .infoBorder{
      //   position: relative;
      //   &::before{
      //     content: '';
      //     width: 100%;
      //     position: absolute;
      //     bottom: 0;
      //     left: 0;
      //     border-bottom: 1px solid rgba(188,188,188,.5)!important;
      //     transform: scaleY(0.5)!important;
      //   }
      // }
      .van-cell-group{
        position: relative;
        min-height: 55px;
        align-items: center;
        display: flex;
        &::after{
          display: none;
        }
        >span{
          font-size: 13px;
          color: #333;
        }
        .imgBox{
          position:absolute;
          right: 0;
          .ewm{
            width: 19px;
            height: 19px;
            padding: 0;
            img{
              width: 100%;
              height: 100%;
            }
          }
          /deep/.ivu-upload{
            border: none!important;
            width: 100%;
          }
        }
        .van-cell{
          padding: 20px 0;
          line-height: 1;
          font-size: 13px;
          align-items: center;
          &::after{
            display: none;
          }
          /deep/.van-field__control{
            text-align: right;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="container animated fadeIn">
    <div class="itemList">
      <p class="sideTxt">基本信息</p>
      <div class="btBorder">
        <van-cell-group class="infoBorder">
          <span>头像</span>
          <q-avatar :src="info.avatar" class="imgBox">
            <Upload
              class="upload"
              ref="upload"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="1024*10"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              name='image'
              multiple
              type="drag"
              :action="baseUrl+ 'app/user/avatarUpload'"
              :headers="$store.getters.token"
            >
              <img :src="info.avatar || 'statics/user/avatar.png'" :alt="info.nickname">
            </Upload>
          </q-avatar>
        </van-cell-group>
      </div>
<!-- 昵称 -->
      <div class="btBorder">
        <van-cell-group class="infoBorder">
          <van-field @blur="onBlured(1)" v-model="info.nickname" label="昵称" />
        </van-cell-group>
      </div>
      <van-cell-group>
        <span>我的二维码</span>
        <router-link to="/Invit/qrcode" class="imgBox">
          <q-btn class="ewm" flat dense>
            <img src="statics/user/ewm.png" alt="">
          </q-btn>
        </router-link>
      </van-cell-group>
    </div>
    <div class="line"></div>
    <div class="itemList">
      <p class="sideTxt">其他信息</p>
      <div class="btBorder">
        <van-cell-group class="infoBorder">
          <van-field  @click="showsexOptions = true" v-if="info.sex==1" value="男" label="性别" />
          <van-field  @click="showsexOptions = true" v-else-if="info.sex==2" value="女" label="性别" />
          <van-field  @click="showsexOptions = true" v-else value="未填写" label="性别" />
          <van-popup v-model="showsexOptions" position="bottom">
            <van-picker
              show-toolbar
              :columns="sexOpt"
              @cancel="showsexOptions = false"
              @confirm="onCon"
            />
          </van-popup>
        </van-cell-group>
      </div>
      <div class="btBorder">
        <van-cell-group>
          <van-field  @blur="onBlured(3)" v-model="info.age" label="年龄" />
        </van-cell-group>
      </div>
<!-- 学历 -->
      <div class="btBorder">
        <van-cell-group class="infoBorder">
          <van-field @click="showPicker = true" label="学历" :value="info.education" />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="educationOptions"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
        </van-cell-group>
      </div>
      <div class="btBorder">
        <van-cell-group class="infoBorder">
          <van-field label="职业" @blur="onBlured(2)" v-model="info.profession"/>
        </van-cell-group>
      </div>
      <div class="btBorder">
        <van-cell-group>
          <van-field :value="info.hometown|toCityName" label="家乡" disabled />
        </van-cell-group>
      </div>
<!-- 居住地 -->
      <div class="btBorder">
        <van-cell-group class="infoBorder">
          <van-field @click="showDialog = true" label="现居住地" :value="info.reside|toCityName" />
          <areas-select v-model="showDialog" @onBack="onResult"></areas-select>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import areasSelect from 'app/src/components/areas-select/index'
import { API_HOST } from '../../../boot/axios/config'

export default {
  components: { areasSelect },
  inject: ['setTitle', 'registerLeftComponent'],
  data () {
    return {
      title: '个人信息',
      showDialog: false, // 居住地弹框
      showPicker: false, // 学历弹框
      showsexOptions: false, // 性别
      authInfo: {},
      baseInfo: {},
      editMode: false,
      einfo: {},
      sexOptions: [{ label: '未填写', value: 0 }, { label: '男', value: 1 }, { label: '女', value: 2 }],
      sexOpt: ['男', '女'],
      educationOptions: ['初中及以下', '中专/中技/高中', '专科', '本科', '硕士', '博士'],
      baseUrl: API_HOST.http
    }
  },
  computed: mapState({
    info (state) {
      return { ...state.user.info, ...this.authInfo }
    }
  }),
  mounted () {
    this.baseInfo = this.$store.state.user.info
    this.registerLeftComponent(() => {
      if (this.editMode) this.editMode = false
      else this.$router.back()
    })
  },
  methods: {
    // 昵称 职业 失焦
    onBlured (type) {
      if (type === 1) {
        this.upInfo({ nickname: this.info.nickname })
      } else if (type === 2) {
        this.upInfo({ profession: this.info.profession })
      } else {
        this.upInfo({ age: this.info.age })
      }
    },
    // 学历点击完成
    onConfirm (value) {
      this.showPicker = false
      this.upInfo({ education: value })
    },
    onCon (value) {
      this.showsexOptions = false
      if (value === '男') {
        this.info.sex = 1
      } else if (value === '女') {
        this.info.sex = 2
      }
      this.upInfo({ sex: this.info.sex })
    },
    // 居住地点击完成
    onResult (value) {
      this.upInfo({ reside: value.id })
    },
    ...mapActions(['updateUserInfo']),
    upInfo (objData) {
      // let _fields = ['nickname', 'education', 'profession', 'reside']
      // _data = Object.assign({}, ..._fields.map(name => ({ [name]: this.einfo[name] })))
      this.$http.userUpdateInfo(objData, ({ errcode, data, message }) => {
        console.log(objData)
        if (errcode === 0) this.updateUserInfo(objData)
        else this.$toast.fail('更新失败')
      }).catch(e => console.error(e))
    },
    handleSuccess (res, file) {
      this.upInfo({ avatar: res.data })
      this.authInfo.avatar = res.data
    },
    handleFormatError (file) {
      this.$toast.fail({
        title: '文件格式不正确',
        desc: '的文件格式' + file.name + '的文件格式不正确，请选择JPG或PNG'
      })
    },
    handleMaxSize (file) {
      this.$toast.fail({
        title: '超出文件大小限制',
        desc: 'File  ' + file.name + ' 不能超过2'
      })
    }
  }
}
</script>
