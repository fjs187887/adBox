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
  <q-layout>
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
        <van-tab :title="'待提交'">
          <dtj />
        </van-tab>
        <van-tab :title="'待审核'">
          <dsh />
        </van-tab>
        <van-tab :title="'已完成'">
          <ywc />
        </van-tab>
        <van-tab :title="'不通过'">
          <btg />
        </van-tab>
      </van-tabs>
    </div>
  </q-layout>
</template>

<script>
import all from 'pages/Task/TaskHall/MyTask/mini/mini-all'
import dtj from 'pages/Task/TaskHall/MyTask/mini/mini-dtj'
import dsh from 'pages/Task/TaskHall/MyTask/mini/mini-dsh'
import ywc from 'pages/Task/TaskHall/MyTask/mini/mini-ywc'
import btg from 'pages/Task/TaskHall/MyTask/mini/mini-btg'
export default {
  data () {
    return {
      tab: '1'
    }
  },
  components: {
    all,
    dtj,
    dsh,
    ywc,
    btg
  }
}
</script>
