<style lang="less" scoped>
  .c-input{
    padding: 12px;
    background: #fff;
  }
</style>

<template>
  <q-layout style="background: #fff">
    <q-input class="c-input" v-model="text" square outlined type="textarea" placeholder="长按粘贴微信公众号、今日头条等文章链接"></q-input>
    <q-btn class="bg-primary text-white" style="margin: 0 10%;width: 80%" rounded @click="startPage('/taskpreview')">生成我的推广文章</q-btn>
    <div style="width: 100%;text-align: center;margin-top: 20px">如何获取文章链接？</div>
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
      this.$router.push({ path: path, query: { link: this.text } })
    }
  }
}
</script>
