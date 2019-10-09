<style scoped lang="less">
/* tab */
.headerTopBox{
  position: fixed;
  z-index: 101;
  background: #fff;
  width: 100%;
}
.q-header{
  position: relative;
  color: #000;
  width: 100%;
  background: #fff;
  height: 60px;
  padding: 0px 15px;
  transition: all .2s;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  .headerBar{
    position: absolute;
    bottom: 12px;
    list-style: none;
    display: flex;
    height: 25px;
    margin-left: -10px;
  }
  .headerList{
    width: 90px;
    text-align: center;
    display: table;
  }
  /* a */
  .hListItem{
    color: #000;
    font-size: 19px;
    font-weight: 600;
    display: table-cell;
    vertical-align: bottom;
    width: 100%;
    height: 25px;
    transition: font-size .2s;
  }
  .rightBox{
    float: right;
    position: absolute;
    bottom: 12px;
    right: 15px;
  }
  .rightBox .q-btn{
    margin-left: 20px;
    width: 16px;
    height: 16px;
    padding: 0;
    min-width: 0;
    min-height: 0;
  }
  .rightBox .q-btn img{
    width: 16px;
    height: 16px;
  }
}
.c-item{
    width: 100px;
    height: 45px;
    background: #000;
    color: #fff;
    padding: 0 7px;
    align-items: center;
    line-height: 1;
    font-size: 12px;
  }
  .c-item img{
    width: 12px;
    height: 12px;
    margin: 0 5px;
  }
.q-page{
  padding-top: 105px;
}
ul li{
  list-style: none;
  padding: 0;
  margin:0;
}
.bBar{
  padding: 0 15px;
  border-bottom: 5px solid #f2f2f2;
}
.q-btn,
.q-select{
  font-size: 13px;
  border: 0;
  height: auto;
  min-height: 0;
  outline: none;
  padding: 0;
}
.bList{
  height: 90px;
}
.bImg{
  display: block;
  margin: 18px auto 10px;
  width: 57px;
  height: 57px;
  border-radius: 50%;
}
.bTextBox{
  padding-top: 20px;
  .bName{
    font-size: 14px;
    line-height: 1;
    .bNameP{
      margin-right: 5px;
      max-width: 75%;
      line-height: 20px;
    }
    span{
      justify-content: center;
      align-items: center;
      display: flex;
      img{
        height: 11px;
        width: 26px;
        margin-left: 5px;
      }
    }
  }
  .bTip{
    margin: 8px 0 5px;
    line-height: 1;
    color: rgb(152, 157, 166);
  }
  .bNum{
    padding:0 4px;
    width: auto;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    color: rgb(152, 157, 166);
    background: #fff9f5;
  }
}
.bBtnBox{
  padding-top: 30px;
}
.q-btn{
  width: 65px;
  height: 28px;
  min-height: 0;
  min-width: 0;
  font-size: 12px;
  box-shadow: none!important;
  line-height: 1;
  padding: 0;
}
.yiguan{
  border: 1px solid rgb(152, 157, 166)!important;
  color: rgb(152, 157, 166)!important;
  background: #fff!important;
}
/deep/.van-picker-column{
  font-size: 13px;
}
.tagList{
  width: 100%;
  height: auto!important;
  background: #fff;
  overflow: hidden;
  padding: 0 15px;
  border-bottom: 5px solid #f2f2f2;
  .listItem{
    width: 33.3%;
    height: 40px;
    line-height: 40px;
    float: left;
    padding: 0 10px;
    text-align: center;
    font-size: 13px;
    color: #333;
    list-style: none;
    img{
      width: 8px;
      vertical-align: middle;
      margin-left: 5px;
    }
  }
  /deep/.van-dropdown-menu__title{
    font-size: 13px;
  }
  .Tkvan{
    // 下拉内容
    /deep/.van-dropdown-item__content{
      max-height: 220px;
    }
    /deep/.van-cell{
      font-size: 13px;
    }
  }
}
.q-infinite-scroll{
  padding-top: 105px;
}
</style>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-layout >
    <div class="headerTopBox">
      <q-header class="">
        <ul class="headerBar">
          <li class="headerList">
            <router-link class="hListItem" active-class="active" to="/business">商家号</router-link>
          </li>
        </ul>
        <div class="rightBox" align="right">
          <q-btn flat round dense @click="startPage('/search')">
            <img src="statics/footer/search.png" alt="">
          </q-btn>
          <q-btn flat round dense>
            <img src="statics/footer/fb.png" alt="">
            <q-menu :offset="[0, 21]" transition-show="jump-down" transition-hide="jump-up">
              <q-item class="c-item" @click="startPage('/business')" clickable v-close-popup>
                <img  src="statics/menu/tianjia.png"/> 关注商家
              </q-item>
              <q-item class="c-item" @click="$openCamera(2,startSweepCode)" clickable v-close-popup>
                <img src="statics/menu/saoyisao.png"/> 扫一扫
              </q-item>
              <q-item class="c-item" @click="startPage('/usercode')" clickable v-close-popup>
                <img src="statics/menu/erweima.png"/> 我的二维码
              </q-item>
            </q-menu>
          </q-btn>
        </div>
      </q-header>
      <van-dropdown-menu active-color="#ff853a" class="tagList">
        <van-dropdown-item class="Tkvan" @input="zonghe()" v-model="modelSort.value" :options="options" />
        <van-dropdown-item class="Tkvan" @input="searchindustry()" v-model="modelIndustry.value" :options="options1" />
        <li class="listItem" @click="showDialog=true">{{areaname}}<img src="statics/TaskHall/down.png"></li>
      </van-dropdown-menu>
    </div>
    <q-infinite-scroll ref="listScoll" @load="loadMore">
      <nodata v-if="nodata"/>
      <q-pull-to-refresh @refresh="refresh">
      <div class="row bList" v-for="contact in dataInfo" :key="contact.id" @click="gobusiness(contact)">
        <div class="bImgBox col-3">
          <span v-if="contact.avatar"><img class="bImg" :src="contact.avatar" ></span>
          <span v-else><img class="bImg" src="../../../statics/user/avatar.png" ></span>
        </div>
        <div class="bTextBox col-6">
          <div class="bName row">
            <p class="bNameP text-ellipsis">{{contact.nickname}}</p>
            <span v-if="contact.role_permission === 1"><img src="../../../statics/TaskHall/geren.png" alt=""></span>
            <span v-else><img src="../../../statics/TaskHall/qiye.png" alt=""></span>
          </div>
          <p class="bTip" caption>简介：{{contact.auth_introduction || '暂无简介'}}</p>
          <p class="col-12 bNum">关注数：{{contact.fanscount}}</p>
        </div>
        <div class="bBtnBox col-3" style="text-align: center">
          <q-btn v-if="contact.isfans==0" class="col-12 bg-primary text-white" >关注</q-btn>
          <q-btn v-else class="col-12 bg-grey yiguan" >已关注</q-btn>
        </div>
      </div>
      </q-pull-to-refresh>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
        </div>
      </template>
    </q-infinite-scroll>
    <areas-select v-model="showDialog" @onBack="onResult"></areas-select>
  </q-layout>
</template>

<script>
import AreasSelect from 'app/src/components/areas-select'
export default {
  components: { AreasSelect },
  created () {
    // this.getdata()
    this.industry()
  },
  data () {
    return {
      nodata: false,
      expanded: false,
      modelSort: {
        text: '综合排序',
        value: 0
      },
      modelIndustry: {
        text: '所属行业',
        value: 0
      },
      // 排序
      options: [
        {
          text: '综合排序',
          value: 0
        },
        {
          text: '关注数最多',
          value: 1
        },
        {
          text: '访客数最多',
          value: 2
        },
        {
          text: '任务数最多',
          value: 3
        }
      ],
      options1: [
        {
          text: '所属行业',
          value: 0
        }
      ],
      dataInfo: [],
      slide: 1,
      showDialog: false,
      areaname: '所在区域',
      areaid: ''
    }
  },
  methods: {
    startPage (path) {
      this.$router.push(path)
    },
    gobusiness (data) {
      this.$http.post('app/visitor/visitorcount', { visitor_id: data.id }, (res) => {
        if (res.code === 0) {
          this.$http.post('app/visitor/add', { visitor_id: data.id }, (res) => {})
        }
        this.$router.push({ path: '/businessaccount/detailtask', query: { id: data.id } })
      })
    },
    industry () {
      this.$http.post('app/UserAuthentication/industry', {}, (res) => {
        if (res.code === 0) {
          for (let i = 0; i < res.data.length; i++) {
            this.options1.push({ value: res.data[i].id, text: res.data[i].name })
          }
        } else {
        }
      })
    },
    zonghe (value) {
      console.log(this.modelSort.value)
      this.$http.post('app/Business/buser', { fnastype: this.modelSort.value }, (res) => {
        if (res.code === 0) {
          this.dataInfo = res.data
          this.nodata = false
        } else {
          this.dataInfo = []
          this.nodata = true
        }
      })
    },
    searchindustry (value) {
      this.$http.post('app/Business/buser', { industry: this.modelIndustry.value }, (res) => {
        if (res.code === 0) {
          this.dataInfo = res.data
          this.nodata = false
        } else {
          this.dataInfo = []
          this.nodata = true
        }
      })
    },
    onResult (value) {
      this.areaid = value.id
      this.areaname = value.showName
      if (value.name === '') {
        this.areaname = '所在区域'
        this.areaid = ''
      }
      this.$http.post('app/Business/buser', { area: this.areaid }, (res) => {
        if (res.code === 0) {
          this.dataInfo = res.data
          this.nodata = false
        } else {
          this.dataInfo = []
          this.nodata = true
        }
      })
    },
    refresh (done) {
      this.$http.post('app/Business/buser', {}, (res) => {
        if (res.code === 0 && res.data.length > 0) {
          this.dataInfo = res.data
          if (this.dataInfo.length > 9) {
            this.$refs.listScoll.reset()
            this.$refs.listScoll.resume()
          }
        }
        if (res.data.count === 0) {
          this.nodata = true
        }
        done()
      })
    },
    loadMore (index, done) {
      if (index === 1) {
        this.dataInfo = []
      }
      this.$http.post('app/Business/buser', { page: index }, (res) => {
        if (res.code === 0 && res.data.length >= 0) {
          this.dataInfo = this.dataInfo.concat(res.data)
          if (res.data.length < 10) {
            this.$refs.listScoll.stop()
          }
        }
        if (this.dataInfo.length === 0) {
          this.nodata = true
          this.$refs.listScoll.stop()
        }
        done()
      }).catch(e => {
        done()
      })
    }
  }
}
</script>
