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
      <div class="col-4">{{contact.create_time}}</div>
      <div class="col-2 idBox"><span @click="show(contact.fans_id)">{{contact.follwname}}</span></div>
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
    this.setTitle('粉丝管理')
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
          res.data.splice(0, 1)
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
