<style scoped lang="less">
.header{
  display:flex;
  align-items: center;
  font-size: 13px;
  color: #333;
  line-height: 20px;
  .cancel{
    display: flex;
    img{
      width:7px;
      transform: rotate(180deg)
    }
  }
  .text-center{
    font-size: 14px;
  }
  .save{
    color: #ff853a;
    text-align: right;
  }
}
.ads{
  height: calc(~"100% - 140px");
}
/deep/ .ivu-modal-body{
  padding: 0;
  .q-carousel__navigation .q-btn{
    color:#999;
  }
}
.q-carousel__slide{
  overflow-y:auto;
  overflow-x:hidden;
  .slide-container{
    position:relative;
    min-height:100%; width:100%;
    .q-badge{
      top:0; right:0;
      padding-right:2px;
    }
  }
}
.add-types{ // 选择广告 状态
  position: relative;
  height: 140px;
  padding-top: 10px;
  background-color: #fff;
  .ivu-col{
    padding-top: 8px;
    img {
      display: block;
      overflow: hidden;
      margin: 0 auto 5px;
      height:23px; width:23px;
    }
    p{
      font-size: 12px;
      color: #333;
    }
  }
}
</style>
<template>
    <Modal fullscreen title="选择广告" v-model="opened" footer-hide :closable="false">
      <div slot="header" class="header row">
        <div @click="cancel" class="cancel col">
          <img src="statics/money/arrow.png" alt="">
        </div>
        <div class="text-center col">广告模板</div>
        <div @click="save" class="save col">
          保存
        </div>
      </div>
      <q-carousel class="ads" v-model="onad" animated swipeable navigation infinite padding control-color="primaryteal">
        <q-carousel-slide v-for="(item, index) in ads" :key="index" :name="index">
          <div class="slide-container q-pa-sm q-pt-md">
            <component :is="item.type" :value="item" @input="update(index, $event)"></component>
            <q-badge color="white" text-color="primary" floating transparent @click="removeAd(index)">
              <Icon type="md-close"></Icon>
            </q-badge>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <Row class="add-types topBorder" type="flex">
        <i-col span="6" class="typesItem text-center" v-for="type in types" :key="type.type_name" @click.native="addAd(type.type_name)">
          <img :src="type.icon" :alt="type.name">
          <p>{{type.name}}</p>
        </i-col>
      </Row>
    </Modal>
</template>
<script>
import { mapGetters } from 'vuex'
import deepcopy from 'deepcopy'
import types from './select-ad/types'
import editors from './select-ad/ad-editors'
export default {
  components: editors,
  props: {
    value: {
      type: Array,
      default: () => []
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      page: 1,
      hasMore: true,
      onad: 0,
      opened: this.open,
      ads: deepcopy(this.value || [{ type: 'tl' }]),
      types
    }
  },
  computed: mapGetters(['HotVip']),
  methods: {
    cancel () {
      this.ads = this.value
      this.opened = false
    },
    save () {
      this.$emit('input', this.ads)
      this.opened = false
    },
    addAd (type) {
      if (!this.HotVip && this.ads.length >= 1) {
        return this.$toast('您尚未开通热文推会员，只能添加一条广告')
      }
      if (this.HotVip && this.ads.length >= 8) {
        return this.$toast('每条热文最多只能添加8条广告')
      }
      this.ads.push({ type, is_show: true })
      this.onad = this.ads.length - 1
    },
    removeAd (index) {
      this.ads.splice(index, 1)
      this.onad = index === 0 ? 0 : index - 1
    },
    update (index, value) {
      this.$set(this.ads, index, value)
    },
    $open () {
      this.opened = true
    },
    $close () {
      this.opened = false
    }
  }
}
</script>
