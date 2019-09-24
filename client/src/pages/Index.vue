<template>
  <q-layout>
    <q-carousel
            swipeable
            animated
            v-model="slide"
            navigation
            infinite
            autoplay
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
    <q-list bordered>
      <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable>
        <q-item-section>
            <img :src="`${contact.avatar}`" width="100%" height="70px">
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
                  size="10px"
                  round
                  color="primary"
                  icon="share"
                  @click="share(contact)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-layout>
</template>

<style>
  .q-carousel{
    height: 200px;
  }
</style>

<script>
export default {
  data () {
    return {
      offline: [
        {
          id: 4,
          name: '加强党建工作 习近平希望培养这样的人',
          email: '7月9日，习近平总书记出席中央和国家机关党的建设工作会议并发表重要讲话',
          avatar: 'http://p1.pstatp.com/large/pgc-image/749e19c22bab410a93229288de839bea',
          url: 'https://www.toutiao.com/a6712558886806618638/'
        },
        {
          id: 5,
          name: '四川宜宾珙县发生5.6级地震 已致9人受伤',
          email: '四川珙县5.6级地震##地震快讯#截至13：00，受伤人数增至9人，其中，巡场镇5人、珙泉镇3人，孝儿镇1人，其他乡镇暂无',
          avatar: 'http://3g.youth.cn/rdzx/201907/W020190704415190800426.jpeg',
          url: 'https://3w.huanqiu.com/a/1ebcb8/7O28vA5Ebao?agt=20&tt_group_id=6709674866859065863'
        },
        {
          id: 6,
          name: '2G3G信号要没了怎么办？三大运营商最新回应来了',
          email: '最近，有报道称栾先生的手机出了点状况，不管是到窗边找，还是到楼下寻，就是没信号。可是，栾先生手机并没欠费，老年机没问题，电话卡也没毛病',
          avatar: 'https://p1.pstatp.com/list/190x124/pgc-image/3c65297b15a84847b8560a24f18d036b',
          url: 'https://www.toutiao.com/a6709695454910611971/'
        }
      ],
      slide: 1
    }
  },
  methods: {
    share (contact) {
      this.$share(contact.name, contact.email, contact.avatar, contact.url).then(data => {
        this.$set(this, 'display', data)
      }).catch(e => {
        console.dir(e)
      })
      // console.log(contact.name)
    }
  }
}
</script>
