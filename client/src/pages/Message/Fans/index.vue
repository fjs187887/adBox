<template>
  <div class="container">
    <q-pull-to-refresh @refresh="reload" ref="pull">
      <q-infinite-scroll @load="getFans" :disable="loading || !more">
        <q-list>
          <div class="itemBox">
            <div class="row" v-for="(item, index) in fansSessions" :key="index" @click="toDetail(item)">
              <div class="col-2 avatarBox">
                <avatar :src="item|toAvatar(info.id)">
                  <q-badge floating v-if="item.unread>0" round>{{item.unread}}</q-badge>
                </avatar>
                <img class="imgQy" src="../../../statics/TaskHall/qiye.png" v-if="item.type === 3"/>
              </div>
              <div class="col-10 btBorder">
                <p class="name text-ellipsis">{{item|toName}}</p>
                <p caption lines="1" class="last-message text-ellipsis">{{item.messages|toText(item.members)}}</p>
              </div>
            </div>
          </div>
        </q-list>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import filters from '../filters'
export default {
  filters,
  data () {
    return {
      more: true,
      loading: false,
      title: '我的粉丝'
    }
  },
  computed: {
    ...mapGetters(['fansSessions'])
  },
  mounted () {
    this.getFans()
  },
  methods: {
    reload (done) {
      this.getFans(1, done)
    },
    getFans (page, done) {
      this.$http.getFansSession(page, () => {})
    },
    toDetail () {}
  }
}
</script>
