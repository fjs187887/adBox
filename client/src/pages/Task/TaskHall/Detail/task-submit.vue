<style scoped lang="less">
  .c-booter{
    position: fixed;
    bottom:0;
    z-index: 999;
    text-align: center;
    height: auto;
    width: 100%;
    background: #fff;
    padding:15px;
    .c-btn{
      width: 100%;
      height: 40px;
      font-size: 13px;
    }
    .c-btnFx{
      width: 100%;
      background: rgb(255,133,58)!important;
      color: #fff;
    }
  }
  .contentBox{
    .item{
      padding: 20px 15px;
      font-size: 14px;
      p{
        padding: 0 0 20px;
        color: #333;
      }
      span{
        color: #333;
      }
      .imgAdd{
        width: 100%;
      }
      .imgBox{//截图样例
        border-radius: 3px;
        img{
          width: 100%;
          height:100%;
        }
        .shili{
          width: 105px;
          height: 105px;
        }
      }
    }
  }
  /deep/.van-uploader__upload{//上传截图
    height: 105px;
    width: 105px;
    margin: 0;
  }
  /deep/.van-uploader__preview-image{
    width: 105px;
    height: 105px;
    margin-bottom: 0;
  }
  .bottomBox{
    padding:15px 15px;
    width: 100%;
    background: #fff;
    p{
      font-size: 14px;
      color: #333;
      line-height: 1;
      margin-bottom: 15px;
    }
  }
</style>

<template>
  <q-layout>
    <div class="contentBox animated fadeIn">
      <!-- 上传 -->
      <div class="row item">
        <p class="col-12">上传截图</p>
        <div class="row imgBox">
          <van-uploader v-model="fileList"
                        :max-size="2048*1000"
                        accept="image/png,image/jpg,image/jpeg"
                        @oversize="handleMaxSize"
                        :after-read="onRead"
                        :max-count="1"
                        :multiple="false" />
        </div>
      </div>
      <div class="line"></div>
      <!-- 截图样式 -->
      <div class="row item">
        <p class="col-3">截图样例</p>
        <div class="col-12">
          <div class="imgBox">
            <img class="shili" @click="showPreview()" src="statics/shili.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="line"></div>
      <!-- 任务要求 -->
      <div class="row bottomBox">
        <p class="row col-12">任务要求</p>
        <div class="col-12" style="line-height: 2" v-html="contact.task_step_explain"></div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="row topBorder c-booter">
      <q-btn class="c-btn c-btnFx" unelevated rounded outline @click="reviewTask()">确认提交</q-btn>
    </div>
    <van-image-preview  :showIndex="false"
                        v-model="show"
                        :images="images">
    </van-image-preview>
  </q-layout>
</template>

<script>
import { API_HOST } from '../../../../boot/axios/config'

export default {
  name: 'taskdetail',
  inject: ['setTitle'],
  mounted () {
    this.setTitle('提交截图')
  },
  data () {
    return {
      contact: '',
      id: '',
      baseUrl: API_HOST.http,
      imgUrl: '',
      fileList: [],
      show: false,
      images: [
        'statics/shili.jpg'
      ]
    }
  },
  created () {
    this.contact = this.$route.query.data
    this.id = this.$route.query.id
  },
  methods: {
    showPreview () {
      this.show = true
    },
    onRead (file) {
      this.onupload(file)
    },
    reviewTask () {
      if (this.imgUrl.length === '') {
        this.$toast.fail('请先上传截图')
        return
      }
      this.$http.reviewTask({ id: this.id, verify_file: this.imgUrl }, data => {
        if (data.code === 0 && data.data) {
          if (data.msg) {
            this.$toast.success(data.msg)
          }
          this.$router.back()
        }
      }).catch(e => {
      })
    },
    handleMaxSize () {
      this.$toast.fail({
        message: '不能大于2M'
      })
    },
    onupload (file) {
      let formData = new FormData()
      formData.append('file', file.file)
      this.$http.post(this.baseUrl + 'app/task/upload', formData, (res) => {
        if (res.code === 0 && res.data) {
          this.imgUrl = res.data
        }
        console.log(res)
      })
    }
  }
}
</script>
