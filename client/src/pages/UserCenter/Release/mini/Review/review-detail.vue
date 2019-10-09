<style scoped>
  .c-booter{
    position: fixed;
    bottom:0;
    z-index: 99999;
    text-align: center;
    border-top: 1px solid #e6e6e6!important;
    width: 100%;
    padding: 15px 15px;
  }
</style>

<template>
  <q-layout>
    <q-item style="border-bottom: #eee 5px solid">
      <q-item-section avatar>
        <q-avatar>
          <img :src="dataInfo.avatar">
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{dataInfo.nickname}}</q-item-label>
        <q-item-label>{{dataInfo.update_time}}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>不通过</q-item-label>
        <q-item-label>收益：{{dataInfo.real_income}}</q-item-label>
      </q-item-section>
    </q-item>
    <br>
    <img :src="dataInfo.verify_file" style="width: 98%;margin: 0 1%;border: #eee 5px solid">
    <br>
    <div class="row c-booter">
      <q-btn rounded outline color="primary" class="col-4" @click="agree=true" style="margin-left: 10%">通过</q-btn>
      <q-btn rounded outline color="primary" class="col-4" @click="fail=true" style="margin-left: 10%">拒绝</q-btn>
    </div>
    <q-dialog v-model="agree" persistent>
      <q-card style="width: 80%">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">确定通过用户提交的截图？</span>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn  label="取消" color="primary" v-close-popup outline ></q-btn>
          <q-btn  label="确定" color="primary" @click="review('0')" ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="fail" persistent>
      <q-card style="width: 80%">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">选择审核不通过的原因</span>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-option-group :options="options" label="1" type="checkbox" v-model="model"></q-option-group>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn  label="取消" color="primary" v-close-popup outline ></q-btn>
          <q-btn  label="确定" color="primary" @click="review('1')" ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  name: 'review-detail',
  inject: ['setTitle'],
  mounted: function () {
    this.setTitle('截图详情')
  },
  data () {
    return {
      dataInfo: '',
      model: [],
      agree: false,
      fail: false,
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
    this.dataInfo = this.$route.query.data
  },
  methods: {
    review () {
      this.$http.agreeTask({ id: this.dataInfo.id, audit_notes: this.model }, data => {
        if (data.code === 0 && data.data !== null) {
          this.agree = false
          this.fail = false
          this.$router.back()
          if (data.msg) {
            this.$toast.success(data.msg)
          } else {
            this.$toast.success('操作成功')
          }
        }
      }).catch(e => {
      })
    }
  }
}
</script>
