<style scoped lang="less">
  .q-field{height: 30px;}
  .img-add{
    @width: 250px;
    width: @width;
    height: calc(250px / 25 * 4);
    border: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
<template>
  <i-form>
    <FormItem label="上传图片">
      <Upload :max-size="2048" name='image'
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              :action="upload"
              :headers="$store.getters.token"
              :on-success="uploaded"
              :on-format-error="showErrorFormat"
              :on-exceeded-size="showErrorSize">
        <div class="img-add text-center">
          <img :src="ad.img" v-if="ad.img">
          <q-icon name="add" v-else></q-icon>
        </div>
      </Upload>
    </FormItem>
    <FormItem label="链接地址">
      <q-input v-model="ad.link" dense placeholder="https://"></q-input>
    </FormItem>
    <FormItem label="是否展示">
      <q-toggle dense v-model="ad.is_show"/>
    </FormItem>
  </i-form>
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
