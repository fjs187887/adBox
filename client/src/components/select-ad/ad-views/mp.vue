<style scoped lang="less">
.box{
  width:100%;
  height:100%;
  display:flex;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  img {
    display:block;
    overflow:hidden;
    width:45px; height:45px;
    border-radius: 3px;
  }
  .info{
    padding: 0 6px;
    flex:1;
    line-height:1.5em;
    p{
      font-size:13px;
      color: #333;
    }
    span{
      display: block;
      width: 100%;
      font-size:12px;
      color: #666;
      margin-top: 5px;
    }
  }
  .rightBox{
    display: flex;
    img{
      width:30px;
      height:30px;
      margin-left: 15px;
    }
    .q-btn{
      background: #ff853a;
      color: #fff;
      padding: 0;
      font-size: 12px;
      box-shadow: none;
      font-weight: normal;
      min-height: 0;
      width:70px;
      height: 30px;
    }
  }
}
</style>
<template>
  <div class="box">
    <img :src="ad.img" :alt="ad.name"/>
    <div class="info text-ellipsis">
      <p class="text-ellipsis">{{ad.name}}</p>
      <span class="text-ellipsis">{{ad.desc}}</span>
    </div>
    <div class="rightBox">
      <img src="statics/Hot/call.png" alt="">
      <img src="statics/Hot/wx.png" alt="">
      <!-- <q-btn round size="sm"></q-btn> -->
      <!-- <q-btn round size="sm" icon="fab fa-weixin" v-if="ad.wx_img"></q-btn> -->
    </div>
  </div>
</template>
<script>
import base from './base'
export default { extends: base }
</script>
