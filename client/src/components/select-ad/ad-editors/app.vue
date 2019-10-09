<style scoped lang="less">
  .listItem{
    p{
      font-size: 14px;
      color: #333;
    }
    .item.up{ // 上传图片item
      padding: 20px 0;
      align-items: end;
      .ivu-upload.tl{
        width: 100%;
        .img-add{ // 通栏上传图片
          width: 100%;
          height: 40px;
        }
      }
    }
    .item{
      padding: 20px 0;
      position: relative;
      align-items: center;
      .col-3{
        font-size: 13px;
        color: #666;
      }
      .col-9{
        align-items: center;
        display: flex;
        .van-cell{ // col-9输入框
          padding: 0;
        }
        /deep/.van-switch{ // col-9 开关
          font-size: 18px!important;
        }
        .ivu-upload{ // col-9上传
          width: 100%;
          /deep/.ivu-upload-select{
            width: 100%;
          }
          .img-add{
            width: 84px;
            height: 84px;
            border: 1px solid #e6e6e6;
            color: #e0e0e0;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .col-9.switch{
        justify-content: flex-end;
      }
    }
  }
</style>
<template>
  <div class="listItem">
    <p>APP广告</p>
    <div class="item up row btBorder">
      <div class="col-3">上传图片：</div>
      <div class="col-9">
        <Upload :max-size="2048" name='image'
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :action="upload"
                :headers="$store.getters.token"
                :on-success="uploaded"
                :on-format-error="showErrorFormat"
                :on-exceeded-size="showErrorSize">
          <Row class="img-add text-center" type="flex">
            <img :src="ad.img" v-if="ad.img">
            <q-icon name="add" v-else></q-icon>
          </Row>
        </Upload>
      </div>
    </div>
    <div class="item row btBorder">
      <div class="col-3">广告标语</div>
      <div class="col-9">
        <van-field v-model="ad.name" type="textarea" placeholder="请输入广告标语" rows="1" autosize/>
      </div>
    </div>
    <div class="item row btBorder">
      <div class="col-3">广告介绍</div>
      <div class="col-9">
        <van-field v-model="ad.desc" type="textarea" placeholder="请输入广告介绍" rows="1" autosize/>
      </div>
    </div>
    <div class="item row btBorder">
      <div class="col-3">下载链接</div>
      <div class="col-9">
        <van-field v-model="ad.download" type="textarea" placeholder="请输入下载链接" rows="1" autosize/>
      </div>
    </div>
    <div class="item row btBorder">
      <div class="col-3">是否展示：</div>
      <div class="col-9 switch">
        <van-switch
                    v-model="ad.is_show"
                    active-color="#FF853a"
                    inactive-color="#999"
                  />
      </div>
    </div>
  </div>
</template>
<script>
import base from './base'
export default {
  extends: base,
  methods: {
    uploaded (file) {
      if (file.code === 0) {
        this.$set(this.ad, 'img', file.data)
      } else this.$toast(file.msg || '文件上传失败')
    }
  }
}
</script>
