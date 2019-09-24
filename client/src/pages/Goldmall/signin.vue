<template>
  <div>
    <div>
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        autoplay
        style="height: 150px;"
      >
        <q-carousel-slide v-for="item in barlist" :key="item.id" :name="item.id" :img-src="item.imgUrl" ></q-carousel-slide>
      </q-carousel>
    </div>
    <div class="q-stepper--horizontal">
      <div class="q-stepper__header row items-stretch justify-between q-stepper__header--alternative-labels">
        <div class="q-stepper__tab col-grow flex items-center no-wrap relative-position" v-for="item in infos" :key="item.week">
          <q-icon name="check_circle_outline" size="29px" color="red" v-if="item.is_sign"></q-icon>
          <q-icon name="check_circle_outline" size="29px" v-else></q-icon>
          <div class="q-stepper__label q-stepper__line relative-position">
            <div class="q-stepper__title">{{ weeks[item.week] }}</div>
          </div>
        </div>
      </div>
      <div style="text-align: center;">
        本周已连续签到{{ days }}天
      </div>
      <div class="row"  style="text-align: center;margin: 30px 0px 30px 0px;">
        <div class="col-4 offset-4">
          <q-btn color="red" style="width:100%;" @click="oksign">立即签到</q-btn>
        </div>
      </div>
    </div>
    <div style="border-bottom: #eeeeee 5px solid;"></div>
    <div style="padding: 12px" class="magin10">
      <p style="font-size: 16px;font-weight: bold;color: #000000">|签到规则</p>
      <p>1、每日只可签到1次。</p>
      <p>2、本周连续签到1-2天奖励5金币，连续签到3-4天奖励10金币，连续签到5-6天奖励15金币，连续签到7天奖励20金币。</p>
      <p>3、签到中断，将重新开始计算连续签到天数。</p>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
      barlist: [],
      slide: 1,
      weeks: { 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六', 7: '周日' },
      infos: [],
      days: 0
    }
  },
  created () {
    this.setTitle('签到')
    this.$http.post('app/Carousel/firstbar', {}, (res) => {
      this.lodings = false
      this.barlist = res.data
      this.slide = res.data[0].id
    })
    this.inits()
  },
  methods: {
    inits () {
      this.$http.post('app/Signin', {}, (res) => {
        this.infos = res.data.list
        this.days = res.data.days
      })
    },
    oksign () {
      this.$http.post('app/Signin/oksign', {}, (res) => {
        if (res.code === 0) {
          this.$Message.success({
            content: '签到成功',
            onClose: () => {
              this.inits()
            }
          })
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
