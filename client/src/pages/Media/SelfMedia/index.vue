<template>
  <q-layout>
      <div class="row" style="margin: 30px 0">
        <q-select class="col magin-lr-10" outlined v-model="modelSort" :options="options" ></q-select>
        <q-select class="col magin-lr-10" outlined v-model="modelIndustry" :options="options" ></q-select>
        <q-select class="col magin-lr-10" outlined v-model="modelRegion" :options="options" ></q-select>
        <q-btn class="col-1" flat round dense icon="view_headline" />
      </div>
    <div>
      <div class="row zt" v-for="contact in dataInfo" :key="contact.id">
        <div class="col-12">
          <div class="row tt" style="font-size: 16px">
            <div class="col-1">
<!--              <q-radio val="1" ></q-radio>-->
            </div>
            <div class="col-2" ><span @click="detail()">{{contact.name}}</span></div>
            <q-btn class="col-2 bg-primary text-white renzh">已认证</q-btn>
            <q-btn class="col-2 text-primary butt" outline>全国</q-btn>
          </div>
            <div class="row mp">
              <div class="col-1">
              </div>
              <div class="col-2">
                <q-avatar>
                  <img src="statics/app-logo-128x128.png">
                </q-avatar>
              </div>
              <div class="row col-7 font-size14">
                <div class="col-12">
<!--                  <q-btn class="col-2 fw1" color="white" text-color="black">本地生活</q-btn>-->
                  <span class="fw1">本地生活</span>
                  <span class="fw1">服务</span>
                  <span class="fw1">地理</span>
                </div>
                <div class="col-12 fw">价格：<span class="text-primary">{{contact.money}}</span></div>
              </div>
            </div>
          <div class="col-12">
            <div class="row tj">
              <!--            <div class="col-1"></div>-->
              <div class="col-4">好友数：<span>{{contact.hynumber}}</span></div>
              <div class="col-4">接单数：<span>{{contact.jdnumber}}</span></div>
              <div class="col-4">曝光数：<span>{{contact.bgnumber}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<style scoped>
  .zt{
    border-bottom: #eeeeee 10px solid;
    margin: 20px 0;
  }
  .tt{
    margin: 0 20px;
    font-size: 16px;
  }
  >>>.q-field__marginal{
    height: auto;
  }
  >>>.q-field__after, >>>.q-field__append{
    padding-left: 5px;
  }
  .q-field--auto-height >>>.q-field__control, .q-field--auto-height >>> .q-field__native{
    min-height: auto;
  }
  .q-field--outlined >>>.q-field__control{
    padding: 0 5px;
  }
  .magin-lr-10{
    padding: 0 5px;
  }

  .renzh{
    border-radius: 6px;
    min-height: auto;
    padding: 0 5px;
    height: 20px;
    font-size: 12px;
    margin: 0 10px;
    line-height: 1;
    box-shadow: none;
    font-weight: normal;
  }
  .mp{
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: #eeeeee 1px solid;
  }
  .fw{
    font-size: 14px;
    padding: 0 10px;
  }
  .tj{
    margin: 20px;
  }
  .fw1{
    border: 1px #eee solid;
    font-size: 14px;
    border-radius: 4px;
    padding: 2px;
    margin: 0 10px;
  }
  .butt{
    border-radius: 6px;
    height: 20px;
    min-height: auto;
    padding: 0 10px;
    font-size: 12px;
    margin: 0 10px;
    line-height: 1;
    box-shadow: none;
    font-weight: normal;
  }
  .on-left {
    margin-right: 0;
  }
</style>

<script>
export default {
  data () {
    return {
      modelSort: '综合排序',
      modelIndustry: '所属行业',
      modelRegion: '所在区域',
      options: [
        '朋友圈', 'QQ', '微博', '其他'
      ],
      dataInfo: [
        {
          id: 0,
          name: '曹操',
          renzh: 1,
          fanw: '全国',
          money: '100元',
          hynumber: 5000,
          jdnumber: 5000,
          bgnumber: 5000
        },
        {
          id: 1,
          name: '曹操',
          renzh: 1,
          fanw: '全国',
          money: '100元',
          hynumber: 5000,
          jdnumber: 5000,
          bgnumber: 5000
        },
        {
          id: 2,
          name: '曹操',
          renzh: 1,
          fanw: '全国',
          money: '100元',
          hynumber: 5000,
          jdnumber: 5000,
          bgnumber: 5000
        },
        {
          id: 3,
          name: '曹操',
          renzh: 1,
          fanw: '全国',
          money: '100元',
          hynumber: 5000,
          jdnumber: 5000,
          bgnumber: 5000
        }
      ]
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
    },
    detail () {
      this.$router.push('/selfmediadetail')
    }
  }
}
</script>
