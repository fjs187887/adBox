<style lang="less" scoped>
.scrollBox{
  position: relative;
  width: 100%;
  background: #fff;
  &::before{
    content: '';
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 5px;
    background: #fff;
  }
  /deep/.van-tabs--line .van-tabs__wrap{
    height: 40px;
    .van-tabs__line{
      display: none;
    }
    .van-tab{
      font-size: 13px;
      height: 40px;
      line-height: 40px;
    }
    .van-tab--active{
      font-weight: normal;
    }
  }
}
</style>

<template>
  <q-layout class="animated fadeIn">
    <!-- <Affix :offset-top="50">
    <div class="scrollBox">
      <q-tabs v-model="tab" align="justify" indicator-color="transparent" active-color="primary" narrow-indicator>
        <q-route-tab name="1" to="/userreleaseminitask/mini-all">全部</q-route-tab>
        <q-route-tab name="2" to="/userreleaseminitask/mini-dzf">待支付</q-route-tab>
        <q-route-tab name="3" to="/userreleaseminitask/mini-wks">未开始</q-route-tab>
        <q-route-tab name="4" to="/userreleaseminitask/mini-ing">进行中</q-route-tab>
        <q-route-tab name="5" to="/userreleaseminitask/mini-ywc">已完成</q-route-tab>
        <q-route-tab name="6" to="/userreleaseminitask/mini-yqx">已取消</q-route-tab>
        <q-route-tab name="7" to="/userreleaseminitask/mini-btg">不通过</q-route-tab>
      </q-tabs>
    </div>
    </Affix> -->
    <div class="scrollBox">
      <van-tabs swipeable
                sticky
                animated
                :duration="0.2"
                :offset-top="50"
                title-active-color="#ff853a"
                >
        <van-tab :title="'全部'">
          <all />
        </van-tab>
        <van-tab :title="'待支付'">
          <dzf />
        </van-tab>
        <van-tab :title="'未开始'">
          <wks />
        </van-tab>
        <van-tab :title="'进行中'">
          <ing />
        </van-tab>
        <van-tab :title="'已完成'">
          <ywc />
        </van-tab>
        <van-tab :title="'已取消'">
          <yqx />
        </van-tab>
        <van-tab :title="'不通过'">
          <btg />
        </van-tab>
      </van-tabs>
    </div>
  </q-layout>
</template>

<script>
import all from 'pages/UserCenter/Release/mini/mini-all'
import dzf from 'pages/UserCenter/Release/mini/mini-dzf'
import wks from 'pages/UserCenter/Release/mini/mini-wks'
import ing from 'pages/UserCenter/Release/mini/mini-ing'
import ywc from 'pages/UserCenter/Release/mini/mini-ywc'
import yqx from 'pages/UserCenter/Release/mini/mini-yqx'
import btg from 'pages/UserCenter/Release/mini/mini-btg'
export default {
  data () {
    return {
      tab: '1'
    }
  },
  components: {
    all,
    dzf,
    wks,
    ing,
    ywc,
    yqx,
    btg
  }
}
</script>
