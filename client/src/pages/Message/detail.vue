<style scoped lang="less">
  .content{
    overflow-y: auto;
    padding: 15px 15px 0;
    box-sizing:border-box;
    .msgbox{
      position:relative;
      padding-bottom: 20px;
      .chat-time{
        text-align:center;
        >span{
          color: #ffffff;
          font-size: 12px;
          padding: 2px 5px 1px;
          border-radius: 5px;
          background-color: #cecece;
        }
      }
      .record{
        display: flex;
        padding-top: 5px;
        align-items: center;
        &.own{
          flex-direction: row-reverse;
          .record-content{
            margin-left:0;
            margin-right:15px;
            background-color:#a9d7ff;
            &:after{
              left:auto;
              right:-10px;
              border-right:none;
              border-left:10px solid #a9d7ff;
            }
          }
        }
        .record-head-img{
          align-self: flex-start;
          img{
            width: 40px;
            height: 40px;
            display:block;
            border-radius: 5px;
          }
        }
        .record-content{
          color: #333333;
          min-width: 1em;
          font-size: 14px;
          min-height: 25px;
          position:relative;
          line-height: 25px;
          border-radius: 4px;
          word-break: break-all;
          margin-left:15px;
          background-color: #f0f0f0;
          padding: 10px 5px 10px 5px;
          &:after{
            content:"";
            color:inherit;
            left:-10px; top:8px;
            position:absolute;
            width: 0; height: 0;
            border-right: 10px solid #f0f0f0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
          }
        }
        .record-state{
          padding:0 5px;
          .weui-icon{
            font-size:20px;
            &:before{
              margin:0;
            }
          }
        }
      }
    }
  }
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
        height: @input-height;
        border: none;
        padding:1px 5px;
        outline: none;
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
        background-color:#4facfe;
        &.disabled{
          background-color: #dadada!important;
        }
      }
    }
  }
</style>
<template>
  <div style="height: 100%;">
    <div class="content" ref="content">
      <div v-for="(item, index) in chatItems" :key="index">
        <div class="msgbox">
          <div class='chat-time'>
            <span>{{item.date}}</span>
          </div>
          <div :class="{'record':!0, 'own':isOwn(item)}">
            <div class="record-head-img">
              <img v-if="isOwn(item)" :src='item.titleimg'>
              <img v-else v-goto="`/sale/customerdetail?id=${$route.query.visitorid}`" :src="item.titleimg">
            </div>
            <div class="record-content" :ref="`msbox_content_${index}`">
              <component :is="item.type|ViewType" :message="item" :index="index"></component>
            </div>
            <div class="record-state">
              <icon type="warn" v-if="item.state === 1" @click.native="resend(item)"/>
              <inline-loading v-if="item.state === 0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LayoutHeader from '../Layout-header'
import { mapState } from 'vuex'
import MsgViewer, { MsgTypes, DefaultType } from './display-components/index'

export default {
  components: { ...MsgViewer, LayoutHeader },
  computed: {
    ...mapState({
      user: state => state.user.info
    }),
    disabled () {
      return !this.message
    }
  },
  filters: {
    ViewType: type => MsgTypes[type] || MsgTypes[DefaultType]
  },
  data () {
    return {
      title: '',
      message: '',
      chatItems: [],
      page: 1,
      size: 20,
      offset: 10
    }
  },
  methods: {
    isOwn (Message) {
      return this.user.id === Message.sender
    },
    load () {},
    send () {
      console.log(this.message)
    },
    resend () {}
  },
  mounted () {}
}
</script>
