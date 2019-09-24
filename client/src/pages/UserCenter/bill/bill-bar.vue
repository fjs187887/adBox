<style scoped lang="less">
  .topBar{
    width: 100%;
    height: 50px;
    padding: 0 15px;
    .row{
      height: 50px;
      align-items: center;
      .leftBox{
        img{
          float: left;
          width: 8px;
          height:13px;
        }
      }
      .q-tabs{
        height: 25px;
        .q-tab{
          width: 50%;
          height: 25px;
          min-height: auto;
          background: #fff1e8;
          color: rgb(255,144,58);
          font-size: 13px;
        }
        .q-tab:first-child{border-radius: 20px 0 0 20px;}
        .q-tab:last-child{border-radius: 0 20px 20px 0;}
        .active{
          background: rgb(255,144,58)!important;
        }
      }
      .rightBox{
        color: rgb(255,90,61);
        text-align: right;
      }
    }
  }
.bodyBg{
  background: #f2f2f2;
}
</style>

<template>
  <q-layout class="bodyBg animated fadeIn" view="lHh Lpr lFf">
    <q-header class="bg-white topBar">
      <div class="row" align="center">
        <div class="col-2 leftBox" @click="goback('/user')">
          <img src="../../../statics/login/back.png" alt="">
        </div>
        <q-tabs class="col-8" v-model="tab" indicator-color="transparent" active-color="white" narrow-indicator>
          <q-route-tab active-class="active" name="1" to="/bill-task" class="tabs">任务</q-route-tab>
          <q-route-tab active-class="active" name="2" to="/bill-hot" class="tabs">热文推</q-route-tab>
          <!-- <q-route-tab active-class="active" name="3" to="/usertask" class="tabs">团队任务</q-route-tab> -->
        </q-tabs>
<!--        <div class="col-2 rightBox" @click="goback('/review')">审核</div>-->
      </div>
    </q-header>
    <q-page-container><router-view /></q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      tab: '1'
    }
  },
  methods: {
    goback (value) {
      this.$router.push(value)
    }
  }
}
</script>
