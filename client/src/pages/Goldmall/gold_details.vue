<style lang="less" scoped>
  .scrollBox{
    padding: 0 15px;
    .itemList{
      padding: 20px 0;
      position: relative;
      .item{
        &:first-child{margin-bottom: 10px;}
        .itemTit{
          font-size: 14px;
          color: #333;
          line-height: 1;
          width: 100%;
          display: block;
        }
        .itemRed{
          float: right;
          font-size: 14px;
          line-height: 1;
          color: rgb(255,90,61);
        }
        .itemTime{
          font-size: 12px;
          color: #999;
          line-height: 1;
        }
      }
    }
    .van-loading{
      text-align: center;
      margin: 20px auto;
    }
  }
</style>

<template>
  <div class="scrollBox animated fadeIn">
    <!-- quasar 滚动 -->
    <q-infinite-scroll @load="onLoad">
      <div class="itemList btBorder" v-for="item in infos" :key="item.id">
        <van-row class="item">
          <van-col span="19">
            <span class="itemTit ellipsis">{{ item.notes }}</span>
          </van-col>
          <van-col span="5">
            <span class="itemRed">{{ item.amountfu }}</span>
          </van-col>
        </van-row>
        <van-row class="item">
          <span class="itemTime">
            {{ item.create_time }}
          </span>
        </van-row>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
    <nodata v-if="nodata"/>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  inject: ['setTitle'],
  data () {
    return {
      infos: [],
      loading: false,
      nodata: false
    }
  },
  created () {
    this.setTitle('收支明细')
  },
  mounted () {
  },
  methods: {
    onLoad (index, done, status) {
      if (index === 1) {
        this.infos = []
      }
      setTimeout(() => {
        this.$http.post('app/User/goldlist', { page: index, status: status }, (res) => {
          if (res.data.list.length > 0) {
            this.nodata = false
            res.data.list.map((e) => {
              this.infos.push(e)
            })
            done(false)
          } else {
            if (index === 1) {
              this.nodata = true
            }
            done(true)
          }
        })
      }, 500)
    }
  }
}
</script>
