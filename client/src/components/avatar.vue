<style scoped lang="less">
  .mu-avatar {
    padding: 0; margin: 0;
    list-style-type: none;
    background-color: #eee;
    width: 100%; height: 100%;
    img {
      display:block;
      outline: 1px solid #fff;
    }
    img:only-child {
      height: 100%;
      width: 100%;
    }
    img:first-child:nth-last-child(2),
    img:first-child:nth-last-child(2) + img {
      width: 50%; height: 50%;
      &:first-child:nth-last-child(2) + img{
        margin-left:50%
      }
    }
    img:first-child:nth-last-child(3),
    img:first-child:nth-last-child(3) ~ img {
      &:first-child:nth-last-child(3){
        float: none;
        margin:0 auto;
      }
      float:left;
      width: 50%; height:50%;
    }
    img:first-child:nth-last-child(4),
    img:first-child:nth-last-child(4) ~ img {
      float:left;
      width: 50%; height:50%;
    }
  }
</style>
<template>
  <div>
    <q-avatar>
      <div v-if="imgs" class="mu-avatar">
        <template v-for="(src, index) in imgs">
          <img v-if="src" :src="src" :key="index" :alt="alt" />
          <img v-else src="../statics/user/avatar.png" :key="index" :alt="alt"/>
        </template>
      </div>
      <img v-else src="../statics/user/avatar.png" :alt="alt">
    </q-avatar>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: [Array, String],
      default: ''
    },
    alt: {
      type: [String, Number]
    }
  },
  computed: {
    imgs () {
      if (this.src instanceof Array) {
        if (this.src.length) {
          return this.src
        } else {
          return false
        }
      } else if (this.src) {
        return [this.src]
      }
      return false
    }
  }
}
</script>
