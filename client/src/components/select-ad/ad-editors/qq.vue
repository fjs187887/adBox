<style scoped lang="less">
  .q-field{height: 30px;}
  .img-add{
    @width: 60px;
    width: @width;
    height: @width;
    border: 1px dashed #ccc;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
<template>
  <div>
    <i-form :label-width="60" label-position="top">
      <FormItem label="上传图片">
        <Row type="flex" align="middle">
          <i-col span="6">
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
          </i-col>
          <i-col span="17" offset="1">建议尺寸140*140像素</i-col>
        </Row>
      </FormItem>
    </i-form>
    <i-form :label-width="60">
      <FormItem label="广告语">
        <q-input v-model="ad.name" dense placeholder="请输入广告语"></q-input>
      </FormItem>
      <FormItem label="广告介绍">
        <q-input v-model="ad.desc" dense placeholder="请输入广告介绍"></q-input>
      </FormItem>
      <FormItem label="QQ号码">
        <q-input v-model="ad.qq" dense placeholder="请输入QQ号"></q-input>
      </FormItem>
      <FormItem label="是否展示">
        <q-toggle dense v-model="ad.is_show"/>
      </FormItem>
    </i-form>
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
      } else this.$Message.error(file.msg || '文件上传失败')
    }
  }
}
</script>
