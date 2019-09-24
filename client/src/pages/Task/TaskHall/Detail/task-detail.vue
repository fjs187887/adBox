<style scoped>
  .c-header{
    position: fixed;
    top: 50px;
    left: 0;
    height: auto;
    text-align: center;
    z-index: 9;
    width: 100%;
    font-size: 16px;
    align-items: center;
    background-image: url('../../../../statics/TaskHall/ywc.png');
    background-size: 100% 100%;
  }
  .c-booter{
    position: fixed;
    bottom:0;
    z-index: 999;
    text-align: center;
    border-top: 1px solid #e6e6e6!important;
    height:60px;
    width: 100%;
    padding: 0 15px;
  }
  .c-btn{
    margin: 10px 0px;
    height: 40px;
    font-size: 13px;
  }
  .c-btnGz {
    width: 80px;
  }
  .c-btnFx{
    width: 250px;
    margin-left: 15px;
    background: rgb(255,133,58)!important;
    color: #fff;
  }
  .c-btnFx.c-btnOff{
    background: #b7bdc7!important;
    color: #fff;
  }
  .c-iframe {
    height: calc(100vh - 50px);
    width: 100%;
    border: none;
    padding-top: 110px;
    padding-bottom: 60px;
  }
  .c-iframe.xxx {
    padding-bottom: 0;
  }
  .c-iframe.yyy {
    padding-top: 0;
  }
  .diaTop{
    padding: 0;
    height: 70px;
    line-height: 70px;
    text-align: center;
    width: 100%;
    font-weight: 500;
    background-image: url('../../../../statics/TaskHall/bg.png');
    background-size: 100%;
  }
  .diaTit{
    font-size: 18px;
  }
  .diaCen{
    padding: 30px 15px 10px;
  }
  .diaCen .ydjl{
    line-height: 1;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 15px;
    font-size: 14px;
    color: #333;
  }
  .diaCen .ydjl span{
    color: rgb(255,133,58);
    margin-right:10px;
  }
  .diaCen p{
    margin: 20px 0;
    font-size: 13px;
    color: #333;
  }
  .diaBtn{
    width: 100%;
    margin: 0 15px;
    margin-bottom: 20px;
  }
  .statusTxt{
    height: 80px;
    align-items: center;
    line-height: 1;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    padding-left: 40px;
  }
  .moneyTxt{
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color:#fff;
    background: rgba(255,255,255,.2);
  }
  .leftT{
    text-align: left;
    padding-left: 40px;
  }
</style>

<template>
  <q-layout>
    <!-- status -->
    <div class="c-header" v-show="userTask">
      <div class="row statusTxt">
        <p v-if="userTask.status===0">进行中</p>
        <p v-if="userTask.status===2">已完成</p>
      </div>
      <div class="row moneyTxt">
        <p class="col-6 leftT">预计收益：{{task.max_income}}元</p>
        <p class="col-6 rightT">已获收益：{{userTask.real_income || 0}}元</p>
      </div>
    </div>
    <!-- iframe -->
    <iframe :src="task.link" class="c-iframe" :class="{xxx: isMe,yyy: !userTask}"></iframe>
    <!-- 底部  按钮 -->
    <div class="row c-booter" v-if="!isMe">
      <q-btn color="primary" unelevated rounded outline class="col-3 c-btn c-btnGz" @click="businfo()">关注</q-btn>
      <q-btn unelevated rounded outline class="col-8 c-btn c-btnFx c-btnOff" v-if="task.status>=3">已完成</q-btn>
      <q-btn unelevated rounded outline class="col-8 c-btn c-btnFx" v-else-if="task.status===2&&userTask" @click="receive()">重新分享</q-btn>
      <q-btn unelevated rounded outline class="col-8 c-btn c-btnFx" v-else-if="task.status===2" @click="receive()">领取任务<span v-if="task.isfree===0">赚{{task.max_income}}元</span></q-btn>
<!--      <q-btn unelevated rounded outline class="col-8 c-btn c-btnFx c-btnOff" v-if="task.status==3">已抢光</q-btn>-->
    </div>
    <!-- 说明弹出框 -->
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-primary text-white">
        <q-card-section class="diaTop" algn="center">
          <div class="diaTit">任务说明</div>
        </q-card-section>
        <q-card-section class="diaCen bg-white text-black">
          <div class="ydjl"> 阅读奖励 ：<span class="text-primary">{{task.uv_income}}元 * 好友阅读数</span>  最高可得{{task.max_income}}元</div>
          <p>① 分享链接到社交平台，好友点击阅读获取任务收益；</p>
          <p>② 分享时添加分享语可以提升阅读量，点击分享时自动复制分享语；</p>
          <p>③ 只有从APP分享出去的链接会产生收益，转发的链接不会产生收益。</p>
        </q-card-section>
        <q-card-actions align="center" class="bg-white text-white">
          <q-btn class="diaBtn bg-primary" flat label="确定" v-close-popup ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  name: 'taskdetail',
  inject: ['setTitle', 'registerRightComponent'],
  mounted: function () {
    this.setTitle('任务详情')
    this.registerRightComponent(h => h('q-btn', {
      props: {
        dense: true,
        flat: true
      },
      on: {
        click: () => {
          this.persistent = true
        }
      }
    }, '任务说明'))
    this.$http.post('app/PromotionTask/buypoint', { type: 'get', name: 'llfxgg' }, (res) => {
      var time = res.data
      var t
      clearTimeout(t)
      t = setTimeout(() => {
        this.$http.post('app/PromotionTask/buypoint', { type: 'query', name: 'llfxgg', id: this.$route.query.tid }, (res) => {
          if (res.code === 0) {
            this.$q.notify({
              position: 'center',
              message: '浏览分享广告奖励金币',
              type: 'success'
            })
          }
        })
      }, time * 1000)
    })
  },
  data () {
    return {
      userInfo: '',
      userTask: '',
      task: '',
      persistent: false,
      isMe: false
    }
  },
  created () {
    this.userInfo = this.$store.state.user.info
    this.tid = this.$route.query.tid
    this.taskDetail(this.tid)
  },
  methods: {
    taskDetail (tid) {
      this.$http.usertask({ tid: tid }, data => {
        if (data.code === 0 && data.data !== null) {
          this.task = data.data.task
          this.userTask = data.data.usertask
          this.isMe = this.userInfo.id === this.task.uid
          if (data.msg) {
            this.$toast.success(data.msg)
          }
        } else {

        }
      }).catch(e => {
      })
    },
    receive () {
      this.$http.receive({ tid: this.task.id }, data => {
        if (data.code === 0 && data.data !== null) {
          if (data.msg) {
            this.$toast.success(data.msg)
          } else {
            this.$set(this.task, 'url', data.data)
            this.taskDetail(this.tid)
            this.share(this.task)
          }
        } else {

        }
      }).catch(e => {
      })
    },
    share (task) {
      this.$share(task.title, task.context, task.cover, task.url, task.pub_platform).then(data => {
        this.$set(this, 'display', data)
      }).catch(e => {
        console.dir(e)
      })
    },
    businfo () {
      this.$router.push({ path: '/businessaccount/detail', query: { id: this.task.uid } })
    }
  }
}
</script>
