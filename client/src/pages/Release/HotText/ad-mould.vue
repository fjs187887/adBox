<style lang="less" scoped>
  .c-booter {
    position: fixed;
    bottom: 0;
    text-align: center;
    border-top: 1px solid #e6e6e6 !important;
    height: auto;
    width: 100%;
    padding: 0 15px;
    background: #e6e6e6;

    img {
      width: 40px;
      height: 40px;
      margin-top: 10px;
    }
  }

  .content {
    padding: 12px;
    border: 1px solid #e6e6e6;
    height: auto;

    p {
      line-height: 3;
      font-size: 14px;
      margin-top: 30px;
      color: #333;
    }
  }

  .paddingLeft {
    img {
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }

    .upload {
      display: inline-block;
      width: 50px;

      .imgAdd {
        width: 50px;
        height: 50px;
        line-height: 50px;
      }
    }
  }

  .formBox {
    padding-top: 15px;

    .q-input {
      font-size: 13px;
      color: #333;
      caret-color: #ff853a;

      /deep/ .q-field__native {
        padding-left: 90px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    // label
    /deep/ .q-field__label {
      transform: unset !important;
      width: 38%;
      font-size: 13px;
      color: #333;
    }

    /deep/ .q-field__native .q-placeholder {
      float: right;
    }

    // 下边框
    /deep/ .q-field__control::after {
      background: transparent !important;
    }

    /deep/ .q-field__control::before {
      border-bottom: 1px solid #e6e6e6 !important;
    }

    // 封面图
    .formItem {
      padding-top: 20px;

      p {
        float: left;
        font-size: 14px;
        color: #333;
      }

      .paddingLeft {
        padding-left: 90px;

        img {
          width: 80px;
          height: 80px;
          margin-right: 15px;
        }

        .upload {
          display: inline-block;
          width: 80px;

          .imgAdd {
            width: 80px;
            height: 80px;
            line-height: 80px;
          }
        }
      }
    }

    // 接收人群。。
    .item {
      width: 100%;
      display: flex;
      height: 56px;
      line-height: 56px;
      margin-bottom: 20px;
      font-size: 13px;
      color: #333;
      border-bottom: 1px solid #e6e6e6;

      p {
        width: 80px;
      }

      span {
        display: block;
        float: right;
        padding-left: 10px;
      }
    }

    /deep/ .q-field__after {
      border-bottom: 1px solid #e6e6e6
    }

    .txtRed {
      /deep/ .q-field__native.q-placeholder {
        color: red;
        font-size: 14px;
      }
    }
  }

  .q-carousel {
    height: 600px;
  }

  /deep/ .q-badge--floating {
    top: 20px;
    right: 20px;
  }

</style>

<template>
  <q-layout>
    <q-carousel animated v-model="slide" navigation control-color="primary">
      <q-carousel-slide v-for="contact in dataList" :key="contact.id" :name="contact.id">
        <div class="content">
          <span style="color: #000">{{contact.type | titleSwitch}}</span>
          <p>上传图片</p>
          <div class="paddingLeft">
            <div v-if="contact.img">
              <img v-if="contact.type===0" :src="contact.img" style="width: 100%">
              <img v-else :src="contact.img">
            </div>
            <Upload class="upload" ref="upload" :max-size="2048" name='image' multiple type="drag"
                    :format="['jpg','jpeg','png']"
                    :show-upload-list="false"
                    :headers="$store.getters.token"
                    :action="baseUrl+ 'app/task/upload'"
                    :on-success="handleSuccess"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize">
              <div class="imgAdd">
                <q-icon name="add"></q-icon>
              </div>
            </Upload>
          </div>
          <q-form class="" ref="contact">
            <div class="formBox">
              <q-input v-if="contact.type!==0" v-model="contact.title" label="广告标语：" placeholder="请输入。。。" :dense="true"></q-input>
              <q-input v-if="contact.type!==0" v-model="contact.msg" label="广告介绍：" placeholder="请输入。。。" :dense="true"></q-input>
              <q-input v-if="contact.type!==5" v-model="contact.link" :label="contact.type | urlSwitch" placeholder="请输入。。。" :dense="true"></q-input>
            </div>
          </q-form>
          <div v-if="contact.type===2||contact.type===4">
            <p>上传二维码</p>
            <div class="paddingLeft">
              <img v-if="contact.qrcode" :src="contact.qrcode">
              <Upload class="upload" ref="upload" :max-size="2048" name='image' multiple type="drag"
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png']"
                      :action="baseUrl+ 'app/task/upload'"
                      :headers="$store.getters.token"
                      :on-success="qrCodeSuccess"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize">
                <div class="imgAdd"><q-icon name="add"></q-icon></div>
              </Upload>
            </div>
            <q-form class="" ref="contact" v-if="contact.type===2">
              <div class="formBox">
                <q-input v-model="contact.name" label="店铺名称：" placeholder="请输入。。。" :dense="true"></q-input>
                <q-input v-model="contact.attach" label="联系电话：" placeholder="请输入。。。" :dense="true"></q-input>
              </div>
            </q-form>
          </div>
          <div class="row full-width" style="margin-top: 20px">
            <div class="col-6" style="line-height: 3">是否展示</div>
            <div class="col-6" style="text-align: right">
              <q-toggle class="q-mb-md" v-model="contact.isShow" ></q-toggle>
            </div>
          </div>
          <q-badge color="white" text-color="primary" floating transparent @click="closeBotAD(contact.id)">X</q-badge>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="row c-booter">
      <div class="col-3" @click="addTab(0)">
        <img src="statics/release/task.png" alt="">
        <p style="line-height: 2">通栏广告</p>
      </div>
      <div class="col-3" @click="addTab(1)">
        <img src="statics/release/task.png" alt="">
        <p style="line-height: 2">QQ广告</p>
      </div>
      <div class="col-3" @click="addTab(2)">
        <img src="statics/release/task.png" alt="">
        <p style="line-height: 2">商品广告</p>
      </div>
      <div class="col-3" @click="addTab(3)">
        <img src="statics/release/task.png" alt="">
        <p style="line-height: 2">图文广告</p>
      </div>
      <div class="col-3" @click="addTab(4)">
        <img src="statics/release/task.png" alt="">
        <p style="line-height: 2">名片广告</p>
      </div>
      <div class="col-3" @click="addTab(5)">
        <img src="statics/release/task.png" alt="">
        <p style="line-height: 2">二维码广告</p>
      </div>
      <div class="col-3" @click="addTab(6)">
        <img src="statics/release/task.png" alt="">
        <p style="line-height: 2">电话广告</p>
      </div>
      <div class="col-3" @click="addTab(7)">
        <img src="statics/release/task.png" alt="">
        <p style="line-height: 2">App广告</p>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { API_HOST } from '../../../boot/axios/config'
export default {
  filters: {
    titleSwitch (status) {
      switch (status) {
        case 0:
          return '通栏广告'
        case 1:
          return 'QQ广告'
        case 2:
          return '商品广告'
        case 3:
          return '图文广告'
        case 4:
          return '名片广告'
        case 5:
          return '二维码广告'
        case 6:
          return '电话广告'
        case 7:
          return 'App广告'
      }
    },
    urlSwitch (status) {
      switch (status) {
        case 0:
          return '添加链接：'
        case 1:
          return 'QQ号码：'
        case 2:
          return '商品链接：'
        case 3:
          return '添加链接：'
        case 4:
          return '联系电话：'
        case 5:
          return ''
        case 6:
          return '联系方式：'
        case 7:
          return '下载链接：'
      }
    }
  },
  inject: ['setTitle', 'registerRightComponent'],
  mounted: function () {
    this.setTitle('广告模板')
    this.registerRightComponent(h => h('q-btn', {
      props: {
        dense: true,
        flat: true
      },
      on: {
        click: () => {
          this.saveData()
        }
      }
    }, '保存'))
  },
  data () {
    return {
      id: 0,
      baseUrl: API_HOST.http,
      dataList: [],
      persistent: false,
      slide: -1,
      link: ''
    }
  },
  created () {
    this.link = this.$route.query.link
  },
  methods: {
    addTab (type) {
      this.slide++
      this.dataList.push({ id: this.id++, type: type, isShow: false })
    },
    handleSuccess (res, file) {
      // file.url = res.data
      this.$set(this.dataList[this.slide], 'img', res.data)
    },
    qrCodeSuccess (res, file) {
      // file.url = res.data
      this.$set(this.dataList[this.slide], 'qrcode', res.data)
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '的文件格式' + file.name + '的文件格式不正确，请选择JPG或PNG'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: 'File  ' + file.name + ' 不能超过2'
      })
    },
    saveData () {
      console.log(this.dataList)
      var adList = []
      for (var item of this.dataList) {
        if (item.isShow === true) {
          adList.push(item)
        }
      }
      this.$router.push({ path: '/taskpreview', query: { link: this.link, data: adList } })
    },
    closeBotAD (index) {
      this.dataList[index].splice(index, 1)
    }
  }
}
</script>
