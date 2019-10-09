<style lang="less" scoped>
.item{
  padding: 20px 15px;
  .q-textarea{
    border: 1px solid #dadada;
    background: #fff;
    border-radius: 5px;
    padding: 10px 0;
  }
  /deep/.q-field__native{
    padding: 0px!important;
  }
  /deep/.q-field__control:before,.q-field__control:after{
    display: none;
  }
  /deep/.q-field__control:after{
    display: none;
  }
  .q-btn{
    width: 100%;
    margin-top: 30px;
    height: 40px;
    min-height: 0;
    box-shadow: none;
    font-size: 13px;
    color: #fff;
    padding: 0;
  }
  p{
    margin-top: 20px;
    text-align: center;
    font-size: 12px;
    color: #ff853a;
  }
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <div class="item">
      <q-input v-model="text" square outlined type="textarea" placeholder="长按粘贴微信公众号、今日头条等文章链接"></q-input>
      <q-btn class="bg-primary" rounded @click="startPage('/taskpreview')">生成我的推广文章</q-btn>
      <p @click="getUrl">如何获取文章链接？</p>
    </div>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {
    startPage (path) {
      if (!this.text) {
        this.$toast.fail('链接不能为空')
        return
      }
      this.$router.push({ path: path, query: { link: this.text, type: 1 } })
    },
    getUrl () {
      this.$toast.fail('复制粘贴')
    }
  }
}
</script>
