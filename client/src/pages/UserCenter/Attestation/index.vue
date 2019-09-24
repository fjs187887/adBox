<style lang="less" scoped>
.textBox{
  font-size: 14px;
  padding: 0 15px;
  color: #666;
  margin-top: 30px;
  margin-bottom: 50px;
  line-height: 24px;
}
.btnBox{
  padding: 0 15px;
  .itemBox{
    display: flex;
    height: 130px;
    width: 100%;
    margin-bottom: 40px;
    align-items: center;
    font-size: 18px;
    color: #fff;
    background-size: 100%;
    p{
      padding-left: 47%;
      margin-right: 19%;
    }
    img{
      width: 10px;
      height: 20px;
    }
  }
  .itemGr{
    background-image: url('../../../statics/UserCenter/Attestation/rzg.png');
  }
  .itemQy{
    background-image: url('../../../statics/UserCenter/Attestation/rzq.png');
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <div class="row textBox">
      根据国家相关法律规定，发布任务需要进行实名认证，您可以选择以下其中一种认证方式：
    </div>
    <div class="btnBox">
      <div @click="to(1)" class="itemBox itemGr">
        <p>个人认证</p>
        <img src="../../../statics/UserCenter/Attestation/arrow.png" alt="">
      </div>
      <div @click="to(2)" class="itemBox itemQy">
        <p>企业认证</p>
        <img src="../../../statics/UserCenter/Attestation/arrow.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
    }
  },
  mounted () {
    this.setTitle('认证中心')
  },
  methods: {
    to (val) {
      if (val === 1) {
        this.$router.push({ path: 'personal' })
      } else if (val === 2) {
        this.$router.push({ path: 'enterprise' })
      }
    }
  }
}
</script>
