<style scoped lang="less">
.sendbox{
  height:50px;
  .input-text-voice-super{
    width: 100%;
    display:flex;
    padding:0 10px;
    height: inherit;
    align-items: center;
    box-sizing:border-box;
    background-color: #eeeeee;
    @input-height:35px;
    input{
      flex:1;
      color: #666;
      height: @input-height;
      border: none;
      outline: none;
      padding:1px 5px;
      border-radius: 5px;
    }
    button{
      border: none;
      color: #ffffff;
      margin-left: 10px;
      border-radius: 5px;
      white-space: nowrap;
      height: @input-height;
      padding:0 10px;
      background-color:#ff853a;
      &.disabled{
        background-color: #dadada!important;
      }
    }
  }
}
</style>
<template>
  <div class="sendbox">
    <div class="input-text-voice-super">
      <input v-model="content" @keydown.enter="send(type, content)" />
      <button :class="{disabled:disabled}" :disabled="disabled" @click.prevent.stop="send(type, content)">发送</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      type: 1,
      content: ''
    }
  },
  computed: {
    ...mapGetters(['currentSession']),
    disabled () {
      return /^\s*$/.test(this.content) || !this.content || !this.currentSession
    }
  },
  methods: {
    send (type, content) {
      this.content = ''
      this.$emit('send', { type, content })
    }
  }
}
</script>
