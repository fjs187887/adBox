<style scoped lang="less">
  .adbox{
    height: 60px;
    .ad-list{
      width: 100%;
      height: 60px;
      background-color:#fff;
      &.fixed {
        position:fixed;
        bottom: 0;
      }
      .ad{
        height:100%;
        .q-carousel__slide{
          padding: 0;
        }
        .box{
          /deep/p{
            margin:0;
            padding-bottom:2px;
            &:last-child{
              padding-bottom: 0;
            }
          }
        }
        /deep/.q-carousel__navigation{
          padding:0;
          height:1em;
          .q-btn-item{
            text-align: center;
            width:1em;
            height:1em;
            margin:0;
            padding:0;
            min-width:1em;
            min-height:1em;
          }
          .q-icon{transform: scale(.5);}
        }
      }
    }
  }
</style>
<template>
  <div class="adbox" v-if="ads.length">
    <div class="ad-list" :class="{fixed: fixed}">
      <q-carousel class="ad" v-model="onad" control-color="primary" animated swipeable navigation infinite padding autoplay next-icon="chevron_right" prev-icon="chevron_left" navigation-icon="lens">
        <q-carousel-slide v-for="(item, index) in fads" :key="index" :name="index">
          <component :is="item.type" :ad="item"></component>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>
<script>
import views from '../ad-views/index'
import {
  QCarousel,
  QCarouselSlide,
  QCarouselControl } from 'quasar/src/components/carousel'
export default {
  components: { QCarousel, QCarouselSlide, QCarouselControl, ...views },
  props: {
    ads: {
      type: Array,
      default: () => []
    },
    fixed: {
      type: Boolean,
      default: () => true
    }
  },
  data () {
    return {
      onad: 0
    }
  },
  computed: {
    fads () {
      return this.ads.filter(item => item.is_show)
    }
  }
}
</script>
