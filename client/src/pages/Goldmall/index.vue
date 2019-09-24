<style lang="less" scoped>
.Goldmall{
  // 金币栏
  .topBox{
    padding:15px;
    .van-col{
      height: 65px;
      &:first-child{padding-right: 7px;}
      &:last-child{padding-left: 7px;}
      .topItem{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: #fff4ee;
        border-radius: 3px;
        img{
          width: 17px;
          height: 17px;
          vertical-align: middle;
          margin-right: 5px;
        }
        span{
          font-size: 15px;
          font-weight: 700;
          color: #ff853a;
        }
      }
    }
  }
  // tab切换
  .cenBox{
    .van-tabs{
      padding-bottom: 70px;
    }
    .cenItemTab{
      color:#666;
      font-size: 14px;
      font-weight: normal;
      .cenItemInfo{
        padding: 15px;
        overflow: hidden;
        min-height: 400px;
        .info{
          float: left;
          margin-bottom: 15px;
          width: 167px;
          height: 240px;
          border-radius: 3px;
          border: 1px solid #f0f0f0;
          &:nth-child(2n){
            float: right;
          }
          .van-image{
            width: 165px;
            height: 165px;
          }
          .infoTit{
            padding: 10px 5px;
            color: #333;
            font-size: 13px;
          }
          .infoBtn{
            width: 100%;
            height: auto;
            padding: 5px 5px 0;
            .infoJb{
              font-size: 12px;
              color: #ff853a;
              line-height: 30px;
            }
            .van-button{
              float: right;
              padding: 0;
              font-size: 12px;
              font-weight: normal;
              width: 50px;
              height: 22px;
              line-height: 1;
            }
          }
        }
      }
    }
  }
}
// 按钮
.bottomBox{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background-color: #fff;
  padding: 15px;
  .van-button{
    line-height: 1;
    height: 40px;
    font-size: 13px;
    font-weight: normal;
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="Goldmall">
      <!-- 金币栏 -->
      <van-row class="topBox">
        <van-col span="12">
          <div class="topItem" @click="to('gold')">
            <img src="statics/Goldmall/money.png" alt="">
            <span>金币：{{ user_gold }}</span>
          </div>
        </van-col>
        <van-col span="12">
          <div class="topItem" @click="to('sc')">
            <img src="statics/Goldmall/ddan.png" alt="">
            <span>订单：{{ all_order }}</span>
          </div>
        </van-col>
      </van-row>
      <div class="line"></div>
      <!-- tab切换 -->
      <div class="cenBox">
        <van-tabs :offset-top="49" color="#000" line-width="60px" line-height="2px" v-model="active" sticky animated swipeable>
          <van-tab class="cenItemTab" :title="'金币抽奖'">
            <!-- 内容 -->
            <div class="cenItemInfo">
              <nodata v-if="nodata1"/>
              <!-- 列表 -->
              <div class="info" v-for="item in prize_list" :key="item.id">
                <van-image  :src="item.cover_url"
                            show-error
                            @click="to(item.id, 1)">
                  <template v-slot:error>加载失败</template>
                </van-image>
                <!-- 标题 -->
                <p class="infoTit">{{ item.name }}</p>
                <!-- 按钮 金币 -->
                <div class="infoBtn">
                  <span class="infoJb">{{ item.price }}</span>
                  <van-button color="#ff853a" text="抽奖" block @click="to(item.id, 1)"/>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab class="cenItemTab" :title="'金币兑换'">
            <!-- 内容 -->
            <div class="cenItemInfo">
              <nodata v-if="nodata"/>
              <!-- 列表 -->
              <div class="info" v-for="item in goodslist" :key="item.id">
                <van-image  :src="item.cover_url"
                            show-error
                            @click="to(item.id)">
                  <template v-slot:error>加载失败</template>
                </van-image>
                <!-- 标题 -->
                <p class="infoTit">{{ item.name }}</p>
                <!-- 按钮 金币 -->
                <div class="infoBtn">
                  <span class="infoJb">{{ item.price }}</span>
                  <van-button color="#ff853a" text="兑换" block @click="to(item.id)"/>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="bottomBox topBorder">
      <van-button round color="#ff853a" block text="做任务赚金币" @click="btBtn"></van-button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
      goodslist: [],
      user_gold: 0,
      prize_list: [],
      active: 2,
      all_order: 0,
      nodata: false,
      nodata1: false
    }
  },
  created () {
    this.$http.post('app/Goods/goodslist', {}, (res) => {
      this.user_gold = res.data.user_gold
      if (res.data.list.exchange.length > 0) {
        this.goodslist = res.data.list.exchange
      } else {
        this.nodata = true
      }
      if (res.data.list.prize.length > 0) {
        this.prize_list = res.data.list.prize
      } else {
        this.nodata1 = true
      }
      this.all_order = res.data.all_order
    })
  },
  mounted () {
    this.setTitle('金币商城')
  },
  methods: {
    btBtn () {
      this.$router.push('/taskcenter')
    },
    to (val, type) {
      if (type === 1) {
        this.$router.push({ path: '/Goldmall/prize', query: { id: val } })
      } else if (val === 'sc') {
        this.$router.push({ path: '/Goldmall/luckDraw' })
      } else if (val === 'gold') {
        this.$router.push({ path: '/Goldmall/gold' })
      } else {
        this.$router.push({ path: '/Goldmall/details', query: { id: val } })
      }
    }
  }
}
</script>
