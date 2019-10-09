<style lang="less" scoped>
.q-list{
  padding: 0 15px;
  .itemBox{
    height: 55px;
    padding: 0;
    .leftItem{
      font-size: 13px;
      color: #333;
    }
    .rightItem{
      float: right;
      align-items: flex-end;
      .iTxt{
        float: left;
        font-size: 13px;
        color: rgb(188, 188, 188);
      }
      .arrowIcon{
        margin-left: 10px;
        width: 5px;
      }
    }
  }
}
// 登录
.lbb{
  padding: 30px 0 0;
  .loginOutBtn{
    width: 100%;
    height: 45px;
    padding: 0;
    background: #fff4ee;
    font-size: 13px;
    font-weight: normal;
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <q-list>
  <!-- 手机号 -->
      <q-item class="btBorder itemBox" clickable>
        <q-item-section class="leftItem" side>手机号</q-item-section>
        <q-item-section class="rightItem">
          <div>
            <span class="iTxt phone">{{mobile}}</span>
<!--            <img class="arrowIcon" src="statics/user/arrow.png" alt="">-->
          </div>
        </q-item-section>
      </q-item>
  <!-- 修改密码 -->
<!--      <q-item class="btBorder itemBox" clickable>-->
<!--        <q-item-section class="leftItem" side>修改密码</q-item-section>-->
<!--        <q-item-section class="rightItem">-->
<!--          <div>-->
<!--            <img class="arrowIcon" src="statics/user/arrow.png" alt="">-->
<!--          </div>-->
<!--        </q-item-section>-->
<!--      </q-item>-->
  <!-- 消息通知 -->
<!--      <q-item class="btBorder itemBox" clickable>-->
<!--        <q-item-section class="leftItem" side>消息通知</q-item-section>-->
<!--        <q-item-section class="rightItem">-->
<!--          <q-toggle color="primary" v-model="switch1" />-->
<!--        </q-item-section>-->
<!--      </q-item>-->
  <!-- 清除缓存 -->
<!--      <q-item class="btBorder itemBox" clickable>-->
<!--        <q-item-section class="leftItem" side>清除缓存</q-item-section>-->
<!--        <q-item-section class="rightItem">-->
<!--          <div>-->
<!--            <span class="iTxt">12M</span>-->
<!--          </div>-->
<!--        </q-item-section>-->
<!--      </q-item>-->
  <!-- 当前版本 -->
      <q-item class="btBorder itemBox" clickable @click="updateapp()">
        <q-item-section class="leftItem" side>更新版本</q-item-section>
        <q-item-section class="rightItem">
          <div>
            <span class="iTxt version">当前版本1.0</span>
            <img class="arrowIcon" src="statics/user/arrow.png" alt="">
          </div>
        </q-item-section>
      </q-item>
  <!-- 关于我们 -->
      <q-item class="btBorder itemBox" clickable>
        <q-item-section class="leftItem" side>关于我们</q-item-section>
        <q-item-section class="rightItem">
          <div>
            <img class="arrowIcon" src="statics/user/arrow.png" alt="">
          </div>
        </q-item-section>
      </q-item>
  <!-- 登录 -->
      <q-item class="lbb">
        <q-btn class="loginOutBtn" color="primary" flat @click="loginOut()">退出登录</q-btn>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '设置',
      switch1: false,
      mobile: ''
    }
  },
  created () {
    this.mobile = this.$store.state.user.info.phone_number
  },
  methods: {
    loginOut () {
      this.$http.loginOut(() => this.$router.push('/'))
    },
    change () {
    },
    updateapp () {
      this.$toast.success({
        message: '已是最新版本'
      })
    }
  }
}
</script>
