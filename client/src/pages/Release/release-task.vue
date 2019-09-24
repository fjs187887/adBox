<style lang="less" scoped>
.formBox{
  padding: 0 15px;
  padding-top: 15px;
  .q-input{
    font-size: 13px;
    color: #333;
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
    border-bottom: 1px solid #e6e6e6!important;
  }
  // 封面图
  .formItem{
    padding-top: 20px;
    p{
      float: left;
      font-size: 14px;
      color:#333;
    }
    .paddingLeft{
      padding-left: 90px;
      img{
        width:80px;
        height: 80px;
        margin-right:15px;
      }
      .upload{
        display: inline-block;
        width: 80px;
        .imgAdd{
          width:80px;
          height: 80px;
          line-height:80px;
        }
      }
    }
  }
  // 接收人群。。
  .item{
    width: 100%;
    display: flex;
    height: 56px;
    line-height: 56px;
    margin-bottom:20px;
    font-size: 13px;
    color:#333;
    border-bottom: 1px solid #e6e6e6;
    p{
      width: 80px;
    }
    span{
      display: block;
      float: right;
      padding-left: 10px;
    }
  }
  /deep/.q-field__after{
    border-bottom: 1px solid #e6e6e6
  }
  .txtRed{
    /deep/.q-field__native.q-placeholder{
      color: red;
      font-size: 14px;
    }
  }
}
.line{
  margin-top: 20px;
}
.xieyi{
  text-align: center;
  font-size: 12px;
  color:#666;
  padding-top:20px;
  span{
    color: rgb(255,90,61)
  }
}
.enterBtn{
  padding: 10px 15px 30px;
  .q-btn{
    width:100%;
    font-size: 13px;
    height:40px;
    box-shadow: none;
  }
}
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
<q-layout class="animated fadeIn">
    <!-- 旧 -->
    <q-form class="" ref="contact">
      <div class="formBox">
        <q-input v-model="contact.title" label="广告标题：" placeholder="请输入广告标题" :dense="dense" :rules="ruleData.title" ></q-input>
        <q-input v-model="contact.link"  label="内容链接：" placeholder="http//www......" :dense="dense" :rules="ruleData.link" ></q-input>
        <div class="formItem">
          <p>封面图：</p>
          <div class="paddingLeft">
            <img v-if="contact.cover" :src="contact.cover">
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
              <div class="imgAdd">
                <q-icon name="add"></q-icon>
              </div>
            </Upload>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="formBox">
        <div class="item"  @click="show(0,listTousers)">
          <p class="">接收人群：</p>
          <span class="" >{{contact.tousersName}}</span>
        </div>
        <div class="item"  @click="show(1,listFans)" v-if="contact.tousers==1">
          <p class="">粉丝标签：</p>
          <span class="" >{{contact.fansName}}</span>
        </div>
        <div class="item"  @click="showDialog = true" v-if="contact.tousers==0">
          <p class="">分享地域：</p>
          <span class="" >{{contact.pub_area_name}}</span>
        </div>
        <div class="item"  @click="show(2,listPlatform)">
          <p class="">分享平台：</p>
          <span>{{contact.pub_platform_name}}</span>
        </div>
        <q-input v-model="contact.start_time" placeholder="年-月-日 时-分" label="推广时间：" :dense="dense" :rules="[ val => val && val.length > 0 || '请选择']" >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="contact.start_time" mask="YYYY-MM-DD HH:mm" ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
          <template v-slot:after>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time class="timeBox" v-model="contact.start_time" mask="YYYY-MM-DD HH:mm" format24h ></q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="contact.end_time" placeholder="年-月-日 时-分" label="结束时间：" :dense="dense" :rules="[ val => val && val.length > 0 || '请选择']" >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="contact.end_time" mask="YYYY-MM-DD HH:mm" ></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
          <template v-slot:after>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time class="timeBox" v-model="contact.end_time" mask="YYYY-MM-DD HH:mm" format24h ></q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="item"  @click="show(3,listFree)" v-if="contact.tousers==1">
          <p>是否付费：</p>
          <span>{{contact.isfreeName}}</span>
        </div>
        <div v-if="contact.isfree==0||contact.tousers==0">
          <q-input  v-model="contact.uv_income" label="单次点击：" type="number" :dense="dense" :rules="ruleData.uv_income" @input="operation()">
            <template v-slot:append ><span style="font-size: 12px">0.2元起</span> </template>
          </q-input>
          <q-input  v-model="contact.click_num" label="付费点击数：" type="number" :dense="dense" :rules="ruleData.click_num" @input="operation()">
            <template v-slot:append ><span style="font-size: 12px">100次起</span></template>
          </q-input>
          <q-input  v-model="contact.max_income" label="每人最多得：" type="number" :dense="dense" :rules="ruleData.max_income" >
            <template v-slot:append ><span style="font-size: 12px">3元起</span></template>
          </q-input>
          <q-input class="txtRed" color="primary" v-model="contact.budget" label="实付金额：" type="number"  :dense="dense" :rules="ruleData.budget" readonly>
            <template v-slot:append ><span style="font-size: 12px">20元起投放</span></template>
          </q-input>
        </div>
      </div>
    </q-form>
    <div class="xieyi">
      <q-radio v-model="accept" val="line" label="已阅读并同意 " ><span>《任务发布协议》</span></q-radio>
    </div>
    <div class="bg-transparent enterBtn">
      <q-btn rounded color="primary" class="fBtn" @click="submit(contact)">确认发布</q-btn>
    </div>
  <areas-select v-model="showDialog" @onBack="onResult"></areas-select>
</q-layout>
</template>

<script>
import upload from '../../components/upload'
import AreasSelect from 'app/src/components/areas-select'
import { API_HOST } from '../../boot/axios/config'
import areas from '../../assets/jsons/city'

export default {
  inject: ['setTitle'],
  components: { upload, AreasSelect },
  mounted () {
    this.setTitle('发布分享广告')
  },
  data () {
    return {
      contact: '',
      ruleData: {
        type: '',
        title: [
          val => {
            if (/^\s*$/.test(val) || !val) return '请填写标题'
            if (val.length > 50) return '标题不能超过50字'
            return true
          }
        ],
        cover: [
          val => {
            if (/^\s*$/.test(val) || !val) return '请上传图片'
            return true
          }
        ],
        link: [
          val => {
            if (/^\s*$/.test(val) || !val) return '请输入内容链接'
            if (!(/^(https?|ftp|file):\/\/.+$/.test(val))) return 'url格式不对'
            return true
          }
        ],
        uv_income: [
          val => {
            if (/^\s*$/.test(val) || !val) return '不能为空'
            if (val < 0.2) return '不能小于0.2元'
            return true
          }
        ],
        click_num: [
          val => {
            if (/^\s*$/.test(val) || !val) return '不能为空'
            if (val < 100) return '不能小于100次'
            return true
          }
        ],
        max_income: [
          val => {
            if (/^\s*$/.test(val) || !val) return '不能为空'
            if (val < 3) return '不能小于3元'
            return true
          }
        ]
      },
      listPlatform: [
        {
          label: '朋友圈',
          img: 'statics/share/wxcircle.png',
          id: '1'
        },
        // {
        //   label: '微信',
        //   img: 'statics/share/wechat.png',
        //   id: '2'
        // },
        // {
        //   label: 'QQ',
        //   img: 'statics/share/qq.png',
        //   id: '3'
        // },
        {
          label: 'QQ空间',
          img: 'statics/share/qzone.png',
          id: '4'
        },
        {
          label: '微博',
          img: 'statics/share/sina.png',
          id: '5'
        }
      ],
      listTousers: [
        {
          label: '所有用户',
          id: '0'

        },
        {
          label: '粉丝',
          id: '1'
        }
      ],
      listFans: [],
      listFree: [
        {
          label: '付费',
          id: '0'

        },
        {
          label: '免费',
          id: '1'
        }
      ],
      refInput: null,
      accept: false,
      showDialog: false,
      dense: false,
      baseUrl: API_HOST.http,
      isEdit: false,
      areasList: areas
    }
  },
  created () {
    this.contact = this.$route.query.data
    this.isEdit = this.$route.query.attach
    this.getFansLabel()
    if (!this.contact) {
      this.contact = {
        type: '1',
        title: '', // 广告标题
        cover: '',
        link: '', // 内容链接地址
        tousers: '-1', // tousers 接收人群0:所有1:粉丝
        tousersName: '请选择接收人群', // 接收人群
        fans: '-1', // fans 粉丝表id（0：所有，xx:id）
        fansName: '请选择粉丝标签',
        pub_area: '-1', // 地域
        pub_area_name: '省-市-县', // 地域名
        pub_platform: '-1',
        pub_platform_name: '请选择分享平台', // 分享平台
        start_time: '年-月-日 时-分',
        end_time: '年-月-日 时-分',
        isfree: '-1', // isfree 是否付费（0付费，1不付费）
        isfreeName: '请选择是否付费',
        uv_income: '',
        click_num: '', // click_num 付费点击数
        max_income: '',
        budget: ''
      }
    } else {
      this.getNameById()
    }
    this.contact.start_time = this.formatDate(0)
    this.contact.end_time = this.formatDate(1)
  },
  methods: {
    getNameById () {
      for (let i in this.listTousers) {
        if (this.contact.tousers + '' === this.listTousers[i].id) {
          this.contact.tousersName = this.listTousers[i].label
        }
      }
      for (let x in this.listPlatform) {
        if (!this.listPlatform.hasOwnProperty(x)) continue
        if (this.contact.pub_platform + '' === this.listPlatform[x].id) {
          this.contact.pub_platform_name = this.listPlatform[x].label
        }
      }
      for (let x in this.listFree) {
        if (this.contact.isfree + '' === this.listFree[x].id) {
          this.contact.isfreeName = this.listFree[x].label
        }
      }
      this.getCity(this.areasList)
    },
    getCity (list) {
      for (let item of list) {
        if (item.children && item.children.length > 0) {
          this.getCity(item.children)
        } else if (this.contact.pub_area === item.id) {
          this.contact.pub_area_name = item.merger_name
        }
      }
    },
    onResult (value) {
      this.contact.pub_area = value.id
      this.contact.pub_area_name = value.name
    },
    submit () {
      this.$refs.contact.validate().then(success => {
        if (success) {
          if (this.contact.cover === '') {
            this.$toast.fail('请上传封面图')
            return
          }
          if (this.contact.tousers === '-1') {
            this.$toast.fail('请选择接收人群')
            return
          }
          if (this.contact.pub_platform === '-1') {
            this.$toast.fail('请选择分享平台')
            return
          }
          if (this.contact.tousers === '1') {
            if (this.contact.fans === '-1') {
              this.$toast.fail('请选择粉丝标签')
              return
            }
            if (this.contact.isfree === '-1') {
              this.$toast.fail('请选择是否付费')
              return
            }
          }
          if (this.contact.tousers === '0') {
            if (this.contact.pub_area === '-1') {
              this.$toast.fail('请选择分享地域')
              return
            }
          }
          if (this.accept === false) {
            this.$toast.fail('您需要先接受许可证和条款')
          } else {
            let value = {
              type: this.contact.type,
              title: this.contact.title,
              cover: this.contact.cover,
              link: this.contact.link,
              tousers: this.contact.tousers, // tousers 接收人群0:所有1:粉丝
              fans: this.contact.fans, // fans 粉丝表id（0：所有，xx:id）
              pub_area: this.contact.pub_area,
              pub_platform: this.contact.pub_platform,
              start_time: this.contact.start_time,
              end_time: this.contact.end_time,
              isfree: this.contact.isfree, // isfree 是否付费（0付费，1不付费）
              uv_income: this.contact.uv_income,
              max_income: this.contact.max_income,
              click_num: this.contact.click_num, // click_num 付费点击数
              budget: this.contact.budget
            }
            // if (this.contact.isfree === '0') {
            //   let adds = {
            //     uv_income: this.contact.uv_income,
            //     max_income: this.contact.max_income,
            //     click_num: this.contact.click_num, // click_num 付费点击数
            //     budget: this.contact.budget
            //   }
            //   value = Object.assign(value, adds)
            // }
            if (this.isEdit) {
              this.$set(value, 'tid', this.contact.id)
            }
            this.$http.addtask(value, data => {
              if (data.code === 0 && data.data) {
                this.$toast.success('提交成功')
                if (this.contact.isfree === '1') {
                  this.$router.back()
                  return
                }
                this.$Pay(data.data.order_sn, res => {
                  switch (res.status) {
                    case 'success':
                      console.log(res.data)
                      this.$route.back()
                      break
                    case 'cancel':
                      this.$route.back()
                      this.$toast.fail('支付取消')
                      break
                    case 'error':
                      this.$route.back()
                      this.$toast.fail(res.data.message)
                      break
                  }
                })
              } else {
                this.$toast.fail(data.msg)
              }
            }).catch(e => {
            })
          }
        } else {
          this.$toast.fail('请完成必填项')
        }
      })
    },
    // 上传完成
    uploaded (res) {
      if (JSON.parse(res.xhr.response).code === 0) {
        this.contact.cover = JSON.parse(res.xhr.response).data
      }
    },
    // 文件添加到列表时
    added () {
      this.$refs.fm.removeUploadedFiles()
    },
    formatDate (value) {
      let date = new Date()
      return [date.getFullYear(), date.getMonth() + 1, date.getDate() + value].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours(), date.getMinutes()].map(i => i < 10 ? `0${i}` : i).join(':')
    },
    show (value, actions) {
      this.$q.bottomSheet({
        actions: actions
      }).onOk(action => {
        switch (value) {
          case 0:
            this.contact.tousers = action.id
            this.contact.tousersName = action.label
            break
          case 1:
            this.contact.fans = action.id
            this.contact.fansName = action.label
            break
          case 2:
            this.contact.pub_platform = action.id
            this.contact.pub_platform_name = action.label
            break
          case 3:
            this.contact.isfree = action.id
            this.contact.isfreeName = action.label
            break
        }
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    getFansLabel () {
      this.$http.getFansLabel(data => {
        if (data.code === 0 && data.data.length > 0) {
          this.listFans = data.data// 接口
          for (let x in this.listFans) {
            if (this.contact.fans === this.listFans[x].id) {
              this.$set(this.contact, 'fansName', this.listFans[x].label)
            }
          }
        } else {
          this.$toast.fail('请求失败')
        }
      }).catch(e => {
      })
    },
    operation () {
      this.contact.budget = this.contact.uv_income * this.contact.click_num
    },
    handleSuccess (res, file) {
      this.contact.cover = res.data
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
    },
    getUrl (url) {
      // eslint-disable-next-line no-undef
      var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
      xmlhttp.open('GET', url, false)
      xmlhttp.send()
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.Status !== 200) alert('不存在')
        return xmlhttp.Status === 200
      }
      return false
    }
  }
}
</script>
