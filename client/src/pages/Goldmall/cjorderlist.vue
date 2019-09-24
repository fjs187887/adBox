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
        padding-top: 5px;
        opacity: 1;
      }
      .cenMoney{
        margin-top: 23px;
        font-size: 12px;
        color: #333;
        span{
          color: #666;
          // color: rgb(255,90,61);
        }
        .cenCy{
          color: #999;
          float: right;
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
  <!-- 抽奖订单列表 -->
  <!-- vant -->
  <!-- <q-layout class="animated fadeIn">
    <div class="scrollBox">
      <van-tabs swipeable
                sticky
                animated
                :duration="0.2"
                :offset-top="50"
                title-active-color="#ff853a"
                @change="tabschage"
                v-model="tab"
                >
        <van-tab :title="'全部'">
          <q-infinite-scroll @load="onLoad">
            <div style="padding:15px;" v-for="(item, index) in items" :key="index">
              <div>
                <span>订单时间：{{ item.create_time }}</span>
                <span style="float: right">{{ item.bsatusname }}</span>
              </div>
              <div class="row" style="margin-top: 10px;margin-bottom: 10px;" @click="goprize(item.prize_id)">
                <div class="col-2">
                  <q-img :src="item.goods_image" @click="to" :ratio="1"></q-img>
                </div>
                <div class="col-10" @click="to">
                  <div style="line-height: 30px;"><span>{{ item.goods_title }}</span><span style="float: right;"><q-btn v-if="item.conti" style="border-radius: 10px;" color="primary" size="sm" label="继续抽奖" @click="goprize(item.prize_id)" /></span></div>
                  <div style="line-height: 30px;"><span>{{ item.desc }}</span><span style="float:right;">参与{{ item.prize_count }}次</span></div>
                </div>
              </div>
            </div>
          </q-infinite-scroll>
        </van-tab>
        <van-tab :name="1" :title="'进行中'">
          <q-infinite-scroll @load="onLoad">
            <div style="padding:15px;" v-for="(item, index) in infos" :key="index">
              <div>
                <span>订单时间：{{ item.create_time }}</span>
                <span style="float: right">{{ item.bsatusname }}</span>
              </div>
              <div class="row" style="margin-top: 10px;margin-bottom: 10px;" @click="goprize(item.prize_id)">
                <div class="col-2">
                  <q-img :src="item.goods_image" @click="to" :ratio="1"></q-img>
                </div>
                <div class="col-10" @click="to">
                  <div style="line-height: 30px;"><span>{{ item.goods_title }}</span><span style="float: right;"><q-btn v-if="item.conti" style="border-radius: 10px;" color="primary" size="sm" label="继续抽奖" @click="goprize(item.prize_id)" /></span></div>
                  <div style="line-height: 30px;"><span>{{ item.desc }}</span><span style="float:right;">参与{{ item.prize_count }}次</span></div>
                </div>
              </div>
            </div>
          </q-infinite-scroll>
        </van-tab>
        <van-tab :name="2" :title="'已中奖'">
        </van-tab>
        <van-tab :name="3" :title="'未中奖'">
        </van-tab>
      </van-tabs>
    </div>
  </q-layout> -->
  <!-- q -->
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
        <q-tab name="1" label="进行中" />
        <q-tab name="2" label="已中奖" />
        <q-tab name="3" label="未中奖" />
      </q-tabs>
      <div class="line"></div>
    </van-sticky>
    <q-infinite-scroll @load="onLoad">
      <!-- item模块 -->
      <div class="row item" v-for="(item, index) in items" :key="index">
        <!-- 顶部时间 状态 -->
        <div class="row col-12 topBox">
          <p class="col-9 topTime">订单时间：{{ item.create_time }}</p>
          <p class="col-3 topStatus">{{ item.bsatusname }}</p>
        </div>
        <!-- 中间头像 -->
        <div class="row col-12 cenBox" @click="goprize(item.prize_id)">
          <div class="col-12">
            <div class="cenImgBox">
              <img :src="item.goods_image" @click="to"/>
            </div>
            <q-item-section @click="to">
              <q-item-label class="cenTit ellipsis">{{ item.goods_title }}</q-item-label>
              <q-item-label class="cenMoney">
                <span>{{ item.desc }}</span>
                <span class="cenCy">参与{{ item.prize_count }}次</span>
              </q-item-label>
            </q-item-section>
          </div>
        </div>
        <!-- 底部按钮 -->
        <div class="column items-end" style="width: 100%">
          <div class="col" v-if="item.conti">
            <q-btn outline :dense="true" label="继续抽奖" @click="goprize(item.prize_id)" />
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
    to () {
    },
    tabschage (name) {
      this.onLoad(1, false, name)
    },
    onLoad (index, done, status) {
      if (index === 1) {
        this.items = []
      }
      setTimeout(() => {
        this.$http.post('app/Order/luckdraw', { page: index, status: status }, (res) => {
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
    },
    goprize (val) {
      this.$router.push({ path: '/Goldmall/cjdeta', query: { id: val } })
    }
  }
}
</script>
