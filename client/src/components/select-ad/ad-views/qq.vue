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
</style>
<template>
  <div class="box">
    <img :src="ad.img" :alt="ad.name"/>
    <div class="info text-ellipsis">
      <p class="text-ellipsis">{{ad.name}}</p>
      <span class="text-ellipsis">{{ad.desc}}</span>
    </div>
    <q-btn rounded size="sm">QQ咨询</q-btn>
  </div>
</template>
<script>
import base from './base'
export default {
  extends: base
}
</script>
