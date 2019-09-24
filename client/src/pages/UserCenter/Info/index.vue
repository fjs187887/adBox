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
              :action="baseUrl+ 'app/task/upload'"
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
          <van-field @blur="onBlur" :value="info.nickname" label="昵称" />
        </van-cell-group>
      </div>
      <van-cell-group>
        <span>我的二维码</span>
        <router-link to="/usercode" class="imgBox">
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
          <van-field :value="sexOptions[info.sex]? sexOptions[info.sex].label:''" label="性别" disabled />
        </van-cell-group>
      </div>
      <div class="btBorder">
        <van-cell-group>
          <van-field :value="info.birthday" label="生日" disabled />
        </van-cell-group>
      </div>
<!-- 学历 -->
      <div class="btBorder">
        <van-cell-group class="infoBorder">
          <van-field @click="showPicker = true" label="学历" :value="value" />
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
          <van-field @blur="onBlur" label="职业" :value="info.profession"/>
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
          <van-field @click="showJzd = true" label="现居住地" :value="jzd" />
          <van-popup v-model="showJzd" position="bottom">
            <van-area :area-list="areaList"
                      @cancel="showJzd = false"
                      @confirm="onJzd"
                      value="110101" />
          </van-popup>
        </van-cell-group>
      </div>
    </div>
    <!-- 基本 -->
    <!-- <q-list>
      <q-item-label class="headTxt" header>基本信息</q-item-label>
      <q-item class="btBorder avatatBox pt10">
        <q-item-section class="sideTit" side>头像</q-item-section>
        <q-item-section class="textBox">
          <q-avatar :src="info.avatar">
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
              :action="baseUrl+ 'app/task/upload'"
              :headers="$store.getters.token"
            >
              <img :src="info.avatar || 'statics/user/avatar.png'" :alt="info.nickname">
            </Upload>
          </q-avatar>
        </q-item-section>
      </q-item>
      <q-item class="btBorder">
        <q-item-section class="sideTit" side>昵称</q-item-section>
        <q-item-section class="textBox" v-if="editMode"><q-input v-model="einfo.nickname" dense></q-input></q-item-section>
        <q-item-section class="textBox" v-else>{{info.nickname}}</q-item-section>
      </q-item>
      <q-item class="">
        <q-item-section class="sideTit" side>我的二维码</q-item-section>
        <q-item-section class="textBox">
          <router-link to="/usercode" class="q-field">
            <q-btn class="ewm" flat dense>
              <img src="statics/user/ewm.png" alt="">
            </q-btn>
          </router-link>
        </q-item-section>
      </q-item>
    </q-list> -->
    <!-- 线 -->
    <!-- <div class="line"></div> -->
    <!-- 其他 -->
    <q-list separator>
      <q-item-label class="headTxt" header>其他信息</q-item-label>
      <!-- <q-item>
        <q-item-section class="sideTit" side>性别</q-item-section>
        <q-item-section class="textBox">{{sexOptions[info.sex]? sexOptions[info.sex].label:''}}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="sideTit" side>生日</q-item-section>
        <q-item-section class="textBox">{{info.birthday}}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="sideTit" side>学历</q-item-section>
        <q-item-section class="textBox" v-if="editMode">
          <q-select borderless dense
                    v-model="einfo.education"
                    :options="educationOptions"></q-select>
        </q-item-section>
        <q-item-section class="textBox" v-else>{{info.education}}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="sideTit" side>职业</q-item-section>
        <q-item-section class="textBox" v-if="editMode"><q-input v-model="einfo.profession" dense/></q-item-section>
        <q-item-section class="textBox" v-else>{{info.profession}}</q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="sideTit" side>家乡</q-item-section>
        <q-item-section class="textBox">{{info.hometown|toCityName}}</q-item-section>
      </q-item> -->
      <q-item>
        <q-item-section class="sideTit" side>现居住地</q-item-section>
        <q-item-section class="textBox" v-if="editMode">
          <city-selector v-model="einfo.reside" dense borderless></city-selector>
        </q-item-section>
        <q-item-section class="textBox" v-else>{{info.reside|toCityName}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import deepcopy from 'deepcopy'
import { mapState, mapActions } from 'vuex'
import citySelector from 'app/src/components/city-selector'
import { API_HOST } from '../../../boot/axios/config'

export default {
  components: { citySelector },
  inject: ['setTitle', 'registerLeftComponent', 'registerRightComponent'],
  data () {
    return {
      title: '个人信息',
      value: '', // 学历value
      jzd: '', // 居住地value
      showJzd: false, // 居住地弹框
      showPicker: false, // 学历弹框
      authInfo: {},
      baseInfo: {},
      editMode: false,
      einfo: {},
      sexOptions: [{ label: '未填写', value: 0 }, { label: '男', value: 1 }, { label: '女', value: 2 }],
      educationOptions: ['初中及以下', '中专/中技/高中', '专科', '本科', '硕士', '博士'],
      baseUrl: API_HOST.http,
      areaList: {// 居住地 假的
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
        }
      }
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
    this.registerRightComponent(h => h('q-btn', {
      props: {
        flat: true,
        dense: true,
        rounded: true
      },
      on: { click: this._switchMode }
    }, this.editMode ? '完成' : '编辑'))
  },
  methods: {
    onBlur () {
    // 昵称 职业 失焦
      this._updateUserInfo()
    },
    // 学历点击完成
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    },
    // 居住地点击完成
    onJzd (val) {
      this.jzd = ''
      for (var i in val) {
        if (!val.hasOwnProperty(i)) continue
        this.jzd += val[i].name
      }
      this.showJzd = false
    },
    ...mapActions(['updateUserInfo']),
    _updateUserInfo () {
      let _data
      let _fields = ['nickname', 'education', 'profession', 'reside']
      // let _fields = ['nickname', 'sex', 'birthday', 'education', 'profession', 'hometown', 'reside']
      _data = Object.assign({}, ..._fields.map(name => ({ [name]: this.einfo[name] })))
      this.$http.userUpdateInfo(_data, ({ errcode, data, message }) => {
        if (errcode === 0) this.updateUserInfo(_data)
        else this.$toast.fail(message || '更新失败')
      }).catch(e => console.error(e))
    },
    _switchMode () {
      if (this.editMode) {
        this._updateUserInfo()
      } else this.einfo = deepcopy(this.info)
      this.editMode = !this.ed·itMode
    },
    handleSuccess (res, file) {
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
