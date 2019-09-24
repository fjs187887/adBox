<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar q-toolbar style="background: #fff;color: #000">
        <q-toolbar-title>
          <q-tabs align="left" style="font-size: 14px;color: #000">
            <q-route-tab to="/media/self-media" >自媒体</q-route-tab>
            <q-route-tab to="/media/merchant" >内容服务商</q-route-tab>
          </q-tabs>
        </q-toolbar-title>
        <q-btn @click="search()" flat round dense icon="search" />
<!--        <q-btn @click="shopping()"  flat round dense icon="shopping_cart"/>-->
      </q-toolbar>
    </q-header>
    <q-page-container><router-view /></q-page-container>

  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  provide () {
    return {
      setTitle: title => {
        this.title = title
      }
    }
  },
  methods: {
    search () {
      this.$router.push('Search')
    },
    shopping () {
      this.$router.push('../shopping')
    }
  }
}
</script>
