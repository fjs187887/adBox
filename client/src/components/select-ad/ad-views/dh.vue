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
      min-width:60px;
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
    <q-btn dense color="red" rounded size="sm">一键拨打</q-btn>
  </div>
</template>
<script>
import base from './base'
export default {
  extends: base
}
</script>
