<style lang="less" scoped>
.topBox{
  img{
    width:100%;
  }
}
.cenBox{
  padding:30px 0;
  text-align: center;
  .cenTitle{
    padding-bottom: 30px;
    font-size: 13px;
    color: #666;
  }
  .cenInfo{
    padding-bottom: 25px;
    font-size: 14px;
    color: #333;
    li{
      display: flex;
      align-items: center;
      justify-content: center;
      .icon{
        display: block;
        margin: 0 auto;
        width: 21px;
        height: 17px;
        background-size: 100% 100%;
      }
      .icon0{background-image: url(../../../statics/money/huangguan.png);}
      .icon1{background-image: url(../../../statics/money/huangguan2.png);}
      .icon2{background-image: url(../../../statics/money/huangguan3.png);}
    }
  }
  .cenTip{
    text-align: center;
    color: #666;
    font-size: 12px;
    padding-top: 10px;
    span{
      color: #ff853a;
    }
  }
}
.bottomBox{
  position:fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 15px;
  .q-btn{
    width: 100%;
    background-color: #ff853a;
    color: #fff;
    font-size: 13px;
    font-weight: normal;
    min-height: 0;
    height: 40px;
    box-shadow: none;
  }
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <div class="topBox">
      <img src="statics/money/sybg.png" alt="">
    </div>
    <!-- 收益 -->
    <div class="cenBox">
      <ul class="row cenTitle">
        <li class="col-3">排名</li>
        <li class="col-6">用户ID</li>
        <li class="col-3">周收益（元）</li>
      </ul>
      <ul class="row cenInfo" v-show="index<10" v-for="(item, index) in listInfo" :key="index">
        <li class="col-3">
          <span class="icon" v-text="index>2 ? index+1 : ''" :class="hGuan(index)"></span>
        </li>
        <li class="col-6">{{item.nickname}}</li>
        <li class="col-3 text-primary">{{item.count}}</li>
      </ul>
      <div class="cenTip"><span>*</span>榜单只展示前10名用户</div>
    </div>
    <div class="bottomBox topBorder">
      <q-btn rounded @click="startPage('/Invit')">邀请好友赚钱</q-btn>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'revenue-list',
  inject: ['setTitle', 'registerRightComponent'],
  mounted () {
    this.setTitle('收益排行榜')
  },
  data () {
    return {
      listInfo: [],
      index: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    hGuan (index) {
      if (index <= 2) {
        return `icon icon${index}`
      }
    },
    startPage (path) {
      this.$router.push({ path: path, query: '' })
    },
    getData () {
      this.$http.walletRanking(data => {
        if (data.code === 0 && data.data) {
          this.listInfo = data.data.sevenday_income
        } else {

        }
      }).catch(e => {
      })
    }
  }
}
</script>

<style scoped>

</style>
