<template>
  <q-layout class="c-layout animated fadeIn">
    <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="userInfo.avatar">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{userInfo.nickname}}</q-item-label>
          <q-item-label caption>{{userInfo.create_time}}</q-item-label>
        </q-item-section>
      </q-item>
      <div class="c-img">
        <img :src="userInfo.qr_code">
        <!--<img src="https://qr.api.cli.im/qr?data=%25E6%2584%25BF%25E4%25BD%25A0%25E4%25B8%2589%25E5%2586%25AC%25E6%259A%2596%250A%250A%25E6%2584%25BF%25E4%25BD%25A0%25E6%2598%25A5%25E4%25B8%258D%25E5%25AF%2592%250A%250A%25E6%2584%25BF%25E4%25BD%25A0%25E5%25A4%25A9%25E9%25BB%2591%25E6%259C%2589%25E7%2581%25AF%250A%250A%25E4%25B8%258B%25E9%259B%25A8%25E6%259C%2589%25E4%25BC%259E&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=260&kid=cliim&key=e1805fdb642a5ae2e1ece09dcc15cec0">-->
      </div>
      <q-card-section align="center">
        扫一扫上面的二维码，加我为好友
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script>
export default {
  inject: ['setTitle', 'registerRightComponent'],
  mounted () {
    this.setTitle('我的二维码')
    this.registerRightComponent({
      component: 'q-btn',
      props: {
        icon: 'more_vert',
        dense: true,
        flat: true,
        round: true
      },
      on: {
        click: () => {
          // this.show()
        }
      }
    })
  },
  data () {
    return {
      userInfo: ''
    }
  },
  created () {
    this.userInfo = this.$store.state.user.info
    // console.log(this.userInfo)
  },
  methods: {
    show () {
      this.$q.bottomSheet({
        actions: [
          {
            label: '换个样式',
            id: '0'
          },
          {
            label: '保存到手机',
            id: '1'
          },
          {
            label: '分享二维码',
            id: '2'
          },
          {
            label: '扫描二维码',
            id: '3'
          }
        ]
      }).onOk(action => {
        console.log('Action chosen:', action.label)
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }
  }
}
</script>

<style scoped>
  .c-layout {
    padding-top: 40%;
    background: #fefefe;
  }

  .my-card {
    width: 70%;
    left: 15%;
    padding: 10px;
  }
  .c-img{
    padding: 10px;
  }
  .c-img img{
    max-width: 80%;
    margin-left: 10%;
    display: block;
  }

</style>
