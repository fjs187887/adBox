<style scoped lang="less">
.item{
  padding: 20px 15px;
  position: relative;
  &::before{
    content: '';
    position: absolute;
    left: 23px;
    top: 36px;
    width: 1px;
    height: 167px;
    background: #e6e6e6;
    transform: scaleX(0.5);
  }
  .title{
    align-items: center;
    img{
      width: 16px;
      height: 16px;
      margin-right: 15px;
    }
    p{
      line-height: 1;
      font-size: 14px;
      color: #333;
    }
    span{
      width: 100%;
      padding-left: 31px;
      margin-top: 8px;
      line-height: 1;
      font-size: 12px;
      color: #999;
    }
    .yuanyin{
      // color:#333;
      margin-top: -15px;
      line-height: 24px;
    }
  }
  .imgBox{
    margin: 20px 0 35px 9px;
    min-height: 90px;
    img{
      width: 90px;
      height: 90px;
      margin-left: 22px;
    }
  }
}
</style>

<template>
  <q-layout>
    <div class="item">
      <div class="title row">
        <img src="statics/TaskHall/yes.png" alt="">
        <p>上传任务的截图</p>
        <span>{{contact.update_time | formatTime}}</span>
      </div>
      <!-- 图片 -->
      <div class="imgBox">
        <img :src="contact.verify_file" alt="">
      </div>
      <div class="title row">
        <img src="statics/TaskHall/no.png" alt="">
        <p>审核不通过</p>
        <span class="yuanyin" v-html="contact.audit_notes"></span>
      </div>
    </div>
  </q-layout>
</template>

<script>

export default {
  name: 'taskdetail',
  inject: ['setTitle'],
  filters: {
    formatTime (value) {
      let date = new Date(value * 1000)
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(i => i < 10 ? `0${i}` : i).join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].map(i => i < 10 ? `0${i}` : i).join(':')
    }
  },
  mounted () {
    this.setTitle('审核详情')
  },
  data () {
    return {
      contact: '',
      active: 0,
      id: '',
      options: [
        { label: '分享的内容与任务内容不符', value: '1' },
        { label: '分享时长不够', value: '2' },
        { label: '点赞数/评论数不够', value: '3' },
        { label: '朋友圈设置了非公开可见', value: '4' },
        { label: '图片有ps的痕迹', value: '5' }
      ]
    }
  },
  created () {
    this.id = this.$route.query.id
    this.reviewInfo()
  },
  methods: {
    reviewInfo () {
      this.$http.reviewInfo({ id: this.id }, data => {
        if (data.code === 0 && data.data !== null) {
          this.contact = data.data
          var context = JSON.parse(this.contact.audit_notes)
          var detail = ''
          for (let i = 0; i < context.length; i++) {
            for (let j = 0; j < context.length; j++) {
              if (this.options[j].value === context[i]) {
                detail = detail + '<br>' + this.options[j].label
              }
            }
          }
          this.contact.audit_notes = detail
          if (data.msg) {
            this.$toast.success(data.msg)
          }
        } else {

        }
      }).catch(e => {
      })
    }
  }
}
</script>
