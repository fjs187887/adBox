<style lang="less" scoped>
.listBox{
  background: #fff;
  .q-tabs{
    background: #fff;
    .q-tab{
      font-size: 13px;
      color: #333;
      height: 42px;
      /deep/.q-tab__label{
        font-weight: normal;
      }
    }
  }
  // item
  .item{
    width: 100%;
    padding: 25px 15px 20px;
    background: #fff;
    border-bottom: 3px solid #f0f0f0;
    .topBox{
      font-size: 12px;
      .topTime{
        color: #999;
      }
      .topStatus{
        color: rgb(255,133,58);
        text-align: right;
      }
    }
    .cenBox{
      padding-top: 15px;
      .cenImgBox{
        width: 60px;
        height: 60px;
        float: left;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 15px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .cenTit{
        font-size: 14px;
        color: #333;
        padding-top: 3px;
        opacity: 1;
      }
      .cenMoney{
        margin-top: 10px;
        font-size: 12px;
        color: #666;
        >span{
          width: 100%;
          display: block;
          color: #666;
          line-height: 1;
          &:first-child{
            margin-bottom: 5px;
          }
          .price{
            color: rgb(255,90,61);
          }
        }
      }
    }
    >.items-end{
      margin-top: 30px;
      .q-btn{
        width:70px;
        height: 28px;
        margin-left: 15px;
        font-size: 12px;
        font-weight: normal;
        color:#999;
        border-radius: 3px;
        border: 1px solid #999;
      }
    }
  }
}
</style>

<template>
  <!-- 兑换列表 -->
  <div class="animated fadeIn listBox">
    <van-sticky :offset-top="50">
      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        indicator-color="transparent"
        align="justify"
        narrow-indicator
        @input="tabschage"
      >
        <q-tab name="" label="全部"/>
        <q-tab name="1" label="待支付" />
        <q-tab name="2" label="待发货" />
        <q-tab name="4" label="已完成" />
        <q-tab name="-1" label="已取消" />
      </q-tabs>
      <div class="line"></div>
    </van-sticky>
    <q-infinite-scroll @load="onLoad">
      <!-- item -->
      <div class="row item" v-for="(item, index) in items" :key="index">
        <!-- 顶部时间 状态 -->
        <div class="row col-12 topBox" @click="to(item.id)">
          <p class="col-9 topTime">订单时间：{{ item.create_time }}</p>
          <p class="col-3 topStatus">{{ item.statusname }}</p>
        </div>
        <!-- 中间头像 -->
        <div class="row col-12 cenBox" @click="to(item.id)">
          <div class="col-12">
            <div class="cenImgBox">
              <img :src="item.goods_image" @click="to" />
            </div>
            <q-item-section @click="to">
              <q-item-label class="cenTit ellipsis">{{ item.goods_title }}</q-item-label>
              <q-item-label class="cenMoney">
                <span>规格：{{ item.goods_spec }}</span>
                <span>实付：<span class="price">{{ item.price }}</span></span>
              </q-item-label>
            </q-item-section>
          </div>
        </div>
      </div>
      <!-- loading -->
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <nodata v-if="nodata"/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      tab: '',
      items: [],
      nodata: false
    }
  },
  methods: {
    tabschage (newval) {
      this.onLoad(1, false, newval)
    },
    to (val) {
      this.$router.push({ path: '/Goldmall/dhdeta', query: { id: val } })
    },
    onLoad (index, done, status) {
      if (index === 1) {
        this.items = []
      }
      setTimeout(() => {
        this.$http.post('app/Order/dhlist', { page: index, status: status }, (res) => {
          if (res.data.length > 0) {
            this.nodata = false
            res.data.map((e) => {
              this.items.push(e)
            })
            done(false)
          } else {
            if (index === 1) {
              this.nodata = true
            }
            done(true)
          }
        })
      }, 1000)
    }
  }
}
</script>
