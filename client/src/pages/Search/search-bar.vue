<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout view="lHh lpr lFf">
    <q-header elevated class="bg-white text-black">
      <van-search
        v-model="searchKey"
        placeholder="请输入搜索关键词"
        show-action>
        <div slot="action" @click="searchByType()">搜索</div>
      </van-search>
      <q-toolbar class="topBorder tabbox">
        <q-tabs indicator-color="transparent" class="q-tabs-c" v-model="tab" in align="left" active-color="primary">
          <q-tab active-class="active" name="1" @click="startPage('/search/search-task')">任务</q-tab>
          <q-tab active-class="active" name="2" @click="startPage('/search/search-business')">商家号</q-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view ref="shpg" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      tab: '1',
      searchKey: ''
    }
  },
  methods: {
    onCancel () {
    },
    searchByType () {
      this.$refs.shpg.searchByType(this.searchKey)
    },
    startPage (path) {
      this.$router.replace({ path: path, query: { key: this.searchKey } })
    }
  }
}
</script>

<style lang="less" scoped>
  .q-toolbar.tiBar{
    width: 100%;
    padding: 0;
    overflow: hidden;
    display: block;
  }
  .tabbox{
    border-bottom: 5px solid #e6e6e6;
    position: relative;
  }
  /deep/.q-layout__shadow:after{
    display: none;
  }
  .q-tabs-c{
    padding: 0 15px;
    background: #fff;
    height: 45px;
  }
  .q-tabs-c .q-tab{
    font-size: 14px;
    padding: 0;
    min-height: 0;
    transition: all .1s;
    text-align: left;
    height: 45px;
    line-height: 34px;
    margin-right: 20px;
    flex: unset;
    color: #666;
    display: table-cell;
    vertical-align: bottom;
  }
  .q-tabs-c .q-tab.active{
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
</style>
