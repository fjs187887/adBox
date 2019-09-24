<style lang="less" scoped>
.itemList{
  padding: 0 15px;
  .item{
    align-items: center;
    position: relative;
    padding: 20px 0;
    font-size: 13px;
    >p.col-4{
      align-items: center;
      span{
        font-size: 13px;
        padding-left: 7px;
      }
    }
    >p.col-6{
      text-align: center;
    }
    >p.col-2{
      text-align: right;
      color: #ff853a;
    }
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="itemList">
      <div class="row item btBorder" v-for="item in infos" :key="item.id">
        <p class="col-4 row">
          <q-avatar size="35px">
            <img :src="item.avatar || 'statics/user/avatar.png'">
          </q-avatar>
          <span class="col ellipsis">{{item.nickname}}</span>
        </p>
        <p class="col-6">{{ item.update_time }}</p>
        <p class="col-2">参与{{ item.prize_count }}次</p>
      </div>
    </div>
    <!-- <div style="padding: 15px;">
      <div class="row" style="text-align: center;height: 40px;"  v-for="item in infos" :key="item.id">
        <div class="col" style="text-overflow:ellipsis;overflow:hidden;white-space: nowrap;text-align: left;">
          <q-avatar size="30px">
            <img :src="item.avatar">
          </q-avatar>
          &nbsp;
          {{ item.nickname }}
        </div>
        <div class="col" style="padding-top: 5px;">{{ item.update_time }}</div>
        <div class="col" style="padding-top: 5px;"></div>
      </div>
    </div> -->
    <nodata v-if="nodata"/>
  </div>
</template>

<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
      infos: [],
      nodata: false
    }
  },
  created () {
    this.setTitle('参与记录')
    this.$http.post('app/Order/partlist', { id: this.$route.query.id }, (res) => {
      if (res.data.list.length > 0) {
        this.infos = res.data.list
      } else {
        this.nodata = true
      }
    })
  },
  mounted () {
  },
  methods: {
  }
}
</script>
