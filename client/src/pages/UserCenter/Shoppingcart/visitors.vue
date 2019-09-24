<template>
  <div class="row head">
    <div class="row" style="padding: 10px 30px;width: 100%">
      <div class="col-1"></div>
      <div class="row col-11" style="text-align: center">
        <div class="col-6">
          访客名称
        </div>
        <div class="col-6">
          访问时间
        </div>
      </div>
    </div>
    <div class="bot1"></div>
    <div class="row bot2" v-for="contact in dataInfo" :key="contact.id">
      <div class="col-1">
        <span v-if="contact.avatar"><img :src="contact.avatar" class="imgt"></span>
        <span v-else><img src="../../../statics/user/avatar.png" class="imgt"></span>
      </div>
      <div class="row col-11" style="text-align: center">
        <div class="col-6">
          <span v-if="contact.nickname">{{contact.nickname}}</span>
          <span v-else>{{contact.fans_id}}</span>
        </div>
        <div class="col-6">
          {{contact.create_time}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataInfo: [
      ]
    }
  },
  inject: ['registerRightComponent', 'setTitle'],
  mounted () {
    this.setTitle('访客')
  },
  created () {
    this.getvistorslist()
  },
  methods: {
    getvistorslist () {
      this.$http.post('app/Visitor/index', (res) => {
        if (res.code === 0) {
          this.dataInfo = res.data
        } else {
        }
      })
    }
  }
}
</script>
<style scoped>
  .bot1{
    border-bottom: #eeeeee 10px solid;
    /*margin: 10px 0;*/
    width: 100%;
  }
  .bot2{
    border-bottom: #eeeeee 1px solid;
    width: 100%;
    padding: 10px 30px;
    font-size: 12px;
  }
  .head{
    font-size: 14px;
  }
  .imgt{
    /*margin: 30px 25px;*/
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
