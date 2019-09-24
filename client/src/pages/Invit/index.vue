<style scoped lang="less">
.fadeIn{
  padding-bottom: 75px;
  // 各个模块
  .itemBox{
    padding: 20px 15px;
    p.itemTit{
      font-size: 14px;
      color: #333;
      padding-bottom: 20px;
      span{
        display: block;
        font-size: 12px;
        color: #999;
        float: right;
      }
    }
    .itemInfo{
      .gradeList{//等级
        width: 100%;
        display: flex;
        overflow: hidden;
        .grade{
          position: relative;
          flex: 1;
          font-size: 12px;
          &:first-child{
            flex: 0;
            p{
              float: left;
            }
            span{
              float: left;
              white-space: nowrap;
            }
          }
          div{//默认状态
            p{
              position: relative;
              float: right;
              display: block;
              width:43px;
              height: 43px;
              line-height: 43px;
              color: #fff;
              border-radius: 50%;
              text-align: center;
              background: #999;
              &::before{
                content: '';
                position: absolute;
                top: 22px;
                left: -40px;
                z-index: -1;
                width: 50px;
                height: 1px;
                background: #999;
              }
            }
            span{
              float: right;
              display: block;
              color:#999;
              font-size: 12px;
              margin-top: 7px;
            }
          }
          .active{//激活状态
            p{
              background: #ff853a;
              &::before{
                background: #ff853a;
              }
            }
            span{
              color: #ff853a
            }
          }
        }
      }
      .fenhong{
        width: 100%;
        padding: 10px 0 15px;
        text-align: center;
        .col-6{
          position: relative;
          h6{
            font-size: 20px;
            line-height: 1;
            color: #ff853a;
          }
          p{
            margin-top: 10px;
            line-height: 1;
            font-size: 12px;
            color: #666;
          }
        }
      }
      .yaoqing{
        p{
          font-size: 12px;
          color:#333;
          line-height: 22px;
        }
      }
      table{
        tr{
          position: relative;
          display: block;
          text-align: center;
          line-height: 43px;
          font-size: 13px;
          color: #666;
          th{
            position: relative;
            float: left;
            width: 95px;
            height: 43px;
            font-weight: normal;
          }
          td{
            position: relative;
            display: inline-block;
            width: 49px;
            height: 43px;
          }
        }
      }
    }
  }
  // 底部切换
  .bottomBox{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    .topItemList{
      position: absolute;
      z-index: -1;
      bottom: 2px;
      transition: bottom .5s;
      .Item{
        transition:opacity .5s;
        opacity: 0;
      }
    }
    div.styleT{
      bottom: 75px;
      .Item{
        transition:opacity .3s;
        opacity: 1!important;
      }
    }
    .ItemList{
      width: 100%;
      background: #fff;
      .Item{
        padding: 15px;
        text-align: center;
        .imgUpBox{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 27px;
          .isUp{
            transition: all .5s;
            height: 14px;
            transform: rotate(180deg)
          }
          .isDown{
            transform: rotate(0)!important;
          }
        }
        .isZk{
          color: #999;
        }
        img{
          width: 25px;
          height: 25px;
        }
        p{
          font-size: 12px;
          color: #333;
          margin-top: 7px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="animated fadeIn">
    <!-- 推广登记 -->
    <div class="itemBox">
      <p class="itemTit">推广等级</p>
      <div class="itemInfo">
        <div class="gradeList">
          <div class="grade" v-for="(item, index) in extension" :key="index">
            <!-- 未选中 -->
            <div v-if="item.active == 0">
              <p>{{item.level}}</p>
              <span>{{item.people}}</span>
            </div>
            <!-- 选中 -->
            <div class="active" v-else>
              <p>{{item.level}}</p>
              <span>{{item.people}}</span>
              <span>(已解锁)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 分红奖励 -->
    <div class="itemBox">
      <p class="itemTit">分红奖励<span @click="to(1)">去查看 ></span></p>
      <div class="itemInfo">
        <div class="row fenhong">
          <div class="col-6 riBorder">
            <h6>{{ total_mon }}</h6>
            <p>总分红收益</p>
          </div>
          <div></div>
          <div class="col-6">
            <h6>{{ invite_count }}</h6>
            <p>邀请人数</p>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!-- 奖励说明 -->
    <div class="itemBox">
      <p class="itemTit">奖励说明</p>
      <div class="itemInfo">
        <table>
          <tbody>
            <tr class="topBorder btBorder">
              <th class="leBorder riBorder">奖励项目</th>
              <td class="riBorder" v-for="item in extension" :key="item.id">{{ item.level }}</td>
            </tr>
            <tr class="btBorder">
              <th class="leBorder riBorder">邀请好友注册</th>
              <td class="riBorder" v-for="item in extension" :key="item.id">{{ item.register_money }}元/人</td>
            </tr>
            <tr class="btBorder">
              <th class="leBorder riBorder">好友任务收益</th>
              <td class="riBorder" v-for="item in extension" :key="item.id">{{ item.task_money }}%</td>
            </tr>
            <tr class="btBorder">
              <th class="leBorder riBorder">好友购买热文推</th>
              <td class="riBorder" v-for="item in extension" :key="item.id">{{ item.rwt_money }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="line"></div>
    <!-- 邀请说明 -->
    <div class="itemBox">
      <p class="itemTit">邀请说明</p>
      <div class="itemInfo">
        <div class="yaoqing">
          <p>1、点击下方分享按钮，好友打开链接下载安装注册，注册成功现金奖励到账。</p>
          <p>2、好友分享任务/购买热文推，获得相应比例的分红收益。</p>
          <p>3、通过微信群、朋友圈等方式邀请好友成功率提升200%。</p>
          <p>4、邀请您的家人、同学、同事、朋友成功率更高。</p>
          <p>5、邀请人数越多，获得收益奖励越多。</p>
        </div>
      </div>
    </div>
    <!-- 切换 -->
    <div class="bottomBox">
      <div :class="is_show ? 'styleT' : ''" class="topItemList ItemList row topBorder">
        <div class="Item col-3" v-for="(item, kk) in rows" :key="kk" @click="sharers(item.param)">
          <img :src="item.src">
          <p>{{ item.lable }}</p>
        </div>
      </div>
      <div class="ItemList row">
        <div class="Item col-3" v-for="(item, kk) in rows1" :key="kk" @click="sharers(item.param)">
          <img :src="item.src">
          <p>{{ item.lable }}</p>
        </div>
        <div class="Item col-3" @click="showall">
          <div class="imgUpBox col">
            <img :class="is_show ? 'isDown' : ''" class="isUp" src="statics/icons/up.png" alt="">
          </div>
          <p class="isZk">{{ is_uptext }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
export default {
  inject: ['setTitle', 'registerRightComponent'],
  data () {
    return {
      // 推广等级
      extension: [],
      // 邀请人数
      invite_count: 0,
      // 总分红收益
      total_mon: 0,
      is_up: false,
      is_uptext: '展开',
      is_show: false,
      rows: [
        {
          'lable': 'QQ',
          'src': 'statics/icons/qq.png',
          'param': '3'
        },
        {
          'lable': 'QQ空间',
          'src': 'statics/icons/kongjian.png',
          'param': '4'
        },
        {
          'lable': '微博',
          'src': 'statics/icons/weibo.png',
          'param': '5'
        },
        {
          'lable': '复制链接',
          'src': 'statics/icons/href.png',
          'param': 'fzlj'
        }
      ],
      rows1: [
        {
          'lable': '微信',
          'src': 'statics/icons/wx.png',
          'param': '2'
        },
        {
          'lable': '朋友圈',
          'src': 'statics/icons/parent.png',
          'param': '1'
        },
        {
          'lable': '二维码',
          'src': 'statics/icons/qrcode.png',
          'param': 'ewm'
        }
      ],
      invite_url: ''
    }
  },
  created () {
    this.$http.post('app/InvitConfig', {}, (res) => {
      if (res.code === 0) {
        this.extension = res.data.list
        this.invite_count = res.data.invite_count
        this.total_mon = res.data.total_mon
        this.invite_url = res.data.invite_url
      }
    })
    console.log(this.extension)
  },
  mounted () {
    this.setTitle('邀请好友一起赚钱')
  },
  methods: {
    to (type) {
      if (type === 1) {
        this.$router.push({ path: '/Invit/income' })
      }
    },
    showall () {
      if (this.is_up) {
        this.is_uptext = '展开'
        this.is_show = false
        this.is_up = false
      } else {
        this.is_uptext = '收起'
        this.is_show = true
        this.is_up = true
      }
    },
    sharers (val) {
      if (val === 'fzlj') {
        this.$copyText(this.invite_url).then((e) => {
          this.$toast.success('已复制')
        }, function (e) {
          this.$toast.fail('复制失败')
        })
      } else if (val === 'ewm') {
        this.$router.push({ path: '/Invit/qrcode' })
      } else {
        this.$share('Ad盒子', '请先注册账号，然后下载APP即可直接登录', 'http://ad.fumenhu.cn/static/image/bgimg.jpg', this.invite_url, Number(val)).then(data => {
          this.$set(this, 'display', data)
        }).catch(e => {
          console.dir(e)
        })
      }
    }
  }
}
</script>
