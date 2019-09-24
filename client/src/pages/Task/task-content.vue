<template>
    <q-layout class="p-t-60" view="lHh Lpr lFf">
      <router-view></router-view>
      <!-- <van-tabs swipeable
                sticky
                animated
                :duration="0.2"
                title-active-color="#ff853a"
                >
        <van-tab :title="'新人专区'">
          <Newus />
        </van-tab>
        <van-tab :title="'任务大厅'">
          <Taskh />
        </van-tab>
        <van-tab :title="'商家号'">
          <Busin />
        </van-tab>
      </van-tabs> -->
  </q-layout>
</template>

<script>
// import Newus from './NewUserZone/index'
// import Taskh from './TaskHall/index'
// import Busin from './BusinessAccount/index'
export default {
  data () {
    return {
    }
  },
  components: {
    // Newus,
    // Taskh,
    // Busin
  }
}
</script>

<style scoped>
  .p-t-60{
    transition:all .2s;
    padding-top: 60px;
  }
</style>
