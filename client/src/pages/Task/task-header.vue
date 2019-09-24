<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="btBorder" :class="searchBarFixed ? 'isFixed' :''">
      <ul class="headerBar">
        <li class="headerList" v-if="newren">
          <router-link class="hListItem" active-class="active" to="/task/new-user">新人专区</router-link>
        </li>
        <li class="headerList">
          <router-link class="hListItem" active-class="active" to="/task/hall">任务大厅</router-link>
        </li>
        <!-- <li class="headerList">
          <router-link class="hListItem" active-class="active" to="/task/businessaccount">商家号</router-link>
        </li> -->
      </ul>
      <div class="rightBox" align="right">
        <q-btn flat round dense @click="startPage('/search')">
          <img src="statics/footer/search.png" alt="">
        </q-btn>
        <q-btn flat round dense>
          <img src="statics/footer/fb.png" alt="">
          <q-menu :offset="[0, 21]" transition-show="jump-down" transition-hide="jump-up">
            <q-item class="c-item" @click="startPage('/businessaccount')" clickable v-close-popup>
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
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      tab: '1',
      state: false,
      searchBarFixed: false,
      newren: false
    }
  },
  created () {
    if (this.$store.state.user.info) {
      var timestamp = (new Date()).getTime()
      var date = (new Date(this.$store.state.user.info.create_time)).getTime()
      if ((date + 86400 * 15 * 1000) > timestamp) {
        this.newren = true
        // this.$router.push({ path: '/task/new-user' })
      }
    }
  },
  provide () {
    return {
      setTitle: title => {
        this.title = title
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    startPage (path) {
      this.$router.push(path)
    },
    startSweepCode (error, value) {
      if (error === '') {
        this.$router.push({ path: '/sweepcode', query: { data: value } })
      } else {
        this.$toast.fail({ message: error })
      }
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > 30 ? this.searchBarFixed = true : this.searchBarFixed = false
    }
  }
}
</script>

<style scoped>
.q-header{
    background: #fff;
    color: #000;
    width: 100%;
    height: 60px;
    padding: 0px 15px;
    transition: all .2s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  header.isFixed{
    height: 40px!important;
  }
  header.isFixed .active{
    font-size: 15px;
  }
  header.isScroll{
    z-index: -1;
  }
.q-toolbar{
  min-height: 0;
  padding: 0 15px;
}
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
  font-size: 14px;
  display: table-cell;
  vertical-align: bottom;
  width: 100%;
  height: 25px;
  transition: font-size .2s;
}
.hListItem.active{
  font-size: 19px;
  font-weight: 600;
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
</style>
