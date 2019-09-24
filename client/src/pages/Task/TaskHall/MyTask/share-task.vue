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
        <van-tab :title="'进行中'">
          <ing />
        </van-tab>
        <van-tab :title="'已完成'">
          <ywc />
        </van-tab>
      </van-tabs>
    </div>
  </q-layout>
</template>

<script>
import all from 'pages/Task/TaskHall/MyTask/task/task-all'
import ing from 'pages/Task/TaskHall/MyTask/task/task-ing'
import ywc from 'pages/Task/TaskHall/MyTask/task/task-finish'
export default {
  data () {
    return {
      tab: '1'
    }
  },
  components: {
    all,
    ing,
    ywc
  }
}
</script>
