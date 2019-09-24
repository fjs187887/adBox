<style scoped lang="less">
  .box{
    width:100%;
    height:100%;
    display:flex;
    padding: 0 6px;
    align-items: center;
    justify-content: center;
    img {
      display:block;
      overflow:hidden;
      width:40px; height:40px;
    }
    .info{
      padding: 0 6px;
      flex:1;
      line-height:1.5em;
      p{
        &:first-child{
          font-size:1.2em;
        }
        &:last-child{
          opacity: .7;
        }
      }
    }
    .q-btn{
      margin-left:10px;
      &:first-child{
        margin-left:0;
      }
    }
  }
</style>
<template>
  <div class="box">
    <img :src="ad.img" :alt="ad.name"/>
    <div class="info text-ellipsis">
      <p class="text-ellipsis">{{ad.name}}</p>
      <p class="text-ellipsis">{{ad.desc}}</p>
    </div>
    <div>
      <q-btn dense color="red" outline round size="sm" icon="call"></q-btn>
      <q-btn dense color="red" outline round size="sm" icon="fab fa-weixin" v-if="ad.wx_img"></q-btn>
    </div>
  </div>
</template>
<script>
import base from './base'
export default { extends: base }
</script>
