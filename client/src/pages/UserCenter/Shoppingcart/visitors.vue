<style lang="less" scoped>
.head{
  padding: 0 15px;
  .item{
    position: relative;
    padding: 20px 0;
    justify-content: center;
    align-items: center;
    .imgBox{
      overflow: hidden;
      img{
        border-radius: 50%;
        width:39px;
      }
    }
    .nameBox{
      padding-right: 20px;
      font-size: 13px;
      color: #333;
    }
    .idBox{
      text-align: right;
      font-size: 13px;
      color: #ff853a;
    }
    >.col-6{
      text-align: right;
    }
  }
}
</style>

<template>
  <div class="head animated fadeIn">
    <div class="row item btBorder" v-for="contact in dataInfo" :key="contact.id">
      <div class="col-2 imgBox">
        <span v-if="contact.avatar"><img :src="contact.avatar" class="imgt"></span>
        <span v-else><img src="statics/user/avatar.png" class="imgt"></span>
      </div>
      <div class="col-4 nameBox text-ellipsis">
        <span v-if="contact.nickname">{{contact.nickname}}</span>
        <span v-else>{{contact.fans_id}}</span>
      </div>
      <div class="col-6">{{contact.create_time}}</div>
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
    this.setTitle('访客统计')
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
