<template>
    <q-layout>
      <q-list v-for="item of dataList" :key="item.id">
        <div class="row full-width item" >
          <p class="col-5 ">{{item.name}}</p>
          <p class="col-5 text-right">{{item.tel}}</p>
        </div>
      </q-list>
    </q-layout>
</template>

<script>
export default {
  inject: ['setTitle'],
  mounted () {
    this.setTitle('客服')
  },
  data () {
    return {
      dataList: []
    }
  },
  created () {
    for (let i = 0; i < 5; i++) {
      this.dataList.push({ name: '电话客服', tel: '400—820 8820' })
    }
  }
}
</script>

<style lang="less" scoped>
  .item {
    border-bottom: 1px #eee solid;
    line-height: 3;

    p {
      margin: 0 4%
    }
  }
</style>
