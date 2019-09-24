<template>
  <div>
    <div style="padding: 40px;">
    <q-img
      :src="qr_code"
      :ratio="1"
    />
    </div>
    <div style="padding: 16px;position: fixed;width: 100%;bottom: 0px;">
      <div class="row" style="margin-top: 10px;padding: 0px 10px 0px 10px;">
        <div class="col" v-for="(item, kk) in rows1" :key="kk" @click="sharers(item.param)">
          <div>
            <div style="margin: 0px auto;max-width: 50px;">
              <q-avatar>
                <img :src="item.src">
              </q-avatar>
            </div>
            <div style="margin: 0px auto;max-width: 50px;text-align: center;height: 30px;line-height: 30px;">{{ item.lable }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['setTitle', 'registerRightComponent'],
  data () {
    return {
      rows1: [
        {
          'lable': '微信',
          'src': 'statics/icons/wx.png',
          'param': '2'
        },
        {
          'lable': '朋友圈',
          'src': 'statics/icons/parent.png',
          'param': '1'
        }
        // {
        //   'lable': '保存图片',
        //   'src': 'https://cdn.quasar.dev/img/avatar.png',
        //   'param': 'ewm'
        // }
      ],
      invite_url: '',
      qr_code: ''
    }
  },
  created () {
    this.$http.post('app/UserInvite/invitcode', {}, (res) => {
      if (res.code === 0) {
        this.qr_code = res.data.qr_code
      }
    })
  },
  mounted () {
    this.setTitle('邀请二维码')
    // this.registerRightComponent(h => h('q-btn', {
    //   props: {
    //     dense: true,
    //     flat: true
    //   },
    //   on: {
    //     click: () => {
    //       this.$router.push({ path: '/Goldmall/signin' })
    //     }
    //   }
    // }, '活动规则'))
  },
  methods: {
    sharers (val) {
      if (val === 'fzlj') {
        this.$copyText(this.invite_url).then((e) => {
          this.$Message.success('已复制到剪切板')
        }, function (e) {
          this.$Message.error('复制失败')
        })
      } else if (val === 'ewm') {
        this.saveAs(this.qr_code)
      } else {
        this.$share('AD盒子', '邀请海报', this.qr_code, this.qr_code, Number(val), 1).then(data => {
          this.$set(this, 'display', data)
        }).catch(e => {
          console.dir(e)
        })
      }
    }
  }
}
</script>

<style scoped>
  .bor{
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.12);
    text-align: center;
    margin-bottom: 15px;
  }
  .q-table th, .q-table td{
    padding: 0px;
    font-size: 12px;
  }
</style>
