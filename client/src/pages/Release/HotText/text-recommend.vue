<style lang="less" scoped>
.scrollBox{
  width: 100%;
  background: #fff;
  overflow-x: scroll;
  border-bottom: 1px solid #e6e6e6;
  .q-tabs{
    font-size: 13px;
    .q-tab{
      height: 44px;
      min-height: auto;
      width: 68px;
      color: #333;
      opacity: 1;
      padding: 0 5px;
    }
  }
}
</style>

<template>
  <q-layout>
    <q-page-container>
      <Affix :offset-top="50">
        <div class="scrollBox">
          <q-tabs align="justify" indicator-color="transparent" active-color="primary"  narrow-indicator>
            <q-route-tab v-for="cate in categorys"
                         :key="cate.id"
                         :name="cate.name"
                         :to="'/textrecommend/text-hot/'+cate.id"
            >{{cate.name}}</q-route-tab>
          </q-tabs>
        </div>
      </Affix>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      categorys: []
    }
  },
  created () {
    this.$http.getHotCategory(({ errcode, data, message }) => {
      if (errcode === 0) {
        this.categorys = data
      }
    })
  }
}
</script>
