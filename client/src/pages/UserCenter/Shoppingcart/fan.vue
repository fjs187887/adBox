<template>
  <div class="row head">
    <div class="row" style="padding: 10px 20px;width: 100%">
      <div class="col-1"></div>
      <div class="row col-11" style="text-align: center">
        <div class="col-4">
          粉丝名称
        </div>
        <div class="col-4">
          关注时间
        </div>
        <div class="col-4">
          粉丝属性
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
        <div class="col-4">
          <span v-if="contact.nickname">{{contact.nickname}}</span>
          <span v-else>{{contact.fans_id}}</span>
        </div>
        <div class="col-4">
          {{contact.create_time}}
        </div>
        <div class="col-4">
          <span @click="show(contact.fans_id)">{{contact.follwname}}</span>
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
      ],
      actions: []
    }
  },
  inject: ['registerRightComponent', 'setTitle'],
  mounted () {
    this.setTitle('粉丝')
  },
  created () {
    this.getfanslist()
    this.getfansvisitor()
  },
  methods: {
    getfanslist () {
      this.$http.post('app/UserFans/index', (res) => {
        if (res.code === 0) {
          this.dataInfo = res.data
        } else {
        }
      })
    },
    getfansvisitor () {
      this.$http.post('app/FansFollw/index', (res) => {
        if (res.code === 0) {
          this.actions = res.data
        } else {
        }
      })
    },
    show (data) {
      this.$q.bottomSheet({
        actions: this.actions
      }).onOk(action => {
        this.$http.post('app/UserFans/upfansfollw', { fans_id: data, follwid: action.id }, (res) => {
          if (res.code === 0) {
            this.$toast.success('修改粉丝属性成功')
            this.getfanslist()
          } else {
            this.$toast.fail('修改失败')
          }
        })
      }).onCancel(() => {
        console.log('Dismissed')
      }).onDismiss(() => {
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
    padding: 10px 20px;
    font-size: 12px;
  }
  .head{
    font-size: 16px;
  }
  .imgt{
    /*margin: 30px 25px;*/
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
