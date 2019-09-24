<template>
  <div class="animated fadeIn nodata">
    <img src="statics/nodata.png" alt="">
    <p>暂无数据</p>
  </div>
</template>

<style lang="less" scoped>
.nodata{
  width: 100%;
  height:auto;
  background: #fff;
  padding-top: 50px;
  padding-bottom: 50px;
  img{
    display: block;
    // width: 126px;
    height: 100px;
    margin: 0 auto 5px;
  }
  p{
    text-align: center;
    color: #999;
    font-size: 12px;
  }
}
</style>
