<style scoped>
  .q-tab--active{
    border:0!important;
  }
  .q-header{
    height: 50px;
    background: #fff;
    color: #333;
  }
  .header-tool{
    padding:0 15px;
  }
  .q-header .q-btn{
    padding: 0;
    font-weight: normal;
  }
  .leftTit{
    width: 80px;
  }
  .leftTit .q-btn{
    font-size: 13px;
    width:8px;
    min-width: 0;
    height: 14px;
  }
  .cenTit{
    font-size: 16px;
  }
  .rigTit{
    width: 80px;
    text-align: right;
    font-size: 13px;
    color: #333;
    font-weight:normal;
  }
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="btBorder" v-if="$slots.left||$slots.title||$slots.right||title||leftComponent||rightComponent">
      <q-toolbar q-toolbar class="header-tool">
        <div class=" leftTit btn-space">
          <slot name="left">
            <component ref="leftComponent"
                       :is="leftComponent.component"
                       v-if="leftComponent"
                       v-on="leftComponent.on"
                       v-bind="leftComponent.props"/>
          </slot>
        </div>
        <q-toolbar-title class="cenTit text-center">
          <slot name="title">{{title}}</slot>
        </q-toolbar-title>
        <div class="rigTit btn-space">
          <slot name="right">
            <component ref="rightComponent"
                       :is="rightComponent.component"
                       v-if="rightComponent"
                       v-on="rightComponent.on"
                       v-bind="rightComponent.props"/>
          </slot>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container :style="CStyle"><slot><router-view ref="view"/></slot></q-page-container>
    <q-footer v-if="$slots.footer || footerComponent">
      <slot name="footer">
        <component ref="footer"
                   :is="footerComponent.component"
                   v-if="footerComponent"
                   v-on="footerComponent.on"
                   v-bind="footerComponent.props"></component>
      </slot>
    </q-footer>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      ContainerStyle: {
        // 'min-height': '100vh'
      },
      showBack: true,
      title: document.title,
      leftComponent: false,
      rightComponent: false,
      footerComponent: false
    }
  },
  computed: {
    CStyle () {
      return Object.assign({ 'min-height': '100vh' }, this.ContainerStyle)
    }
  },
  provide () {
    return {
      setStyle: style => {
        this.$nextTick(() => this.setStyle(style))
      },
      setTitle: title => {
        this.$nextTick(() => this.setTitle(title))
      },
      registerLeftComponent: component => {
        this.$nextTick(() => this.registerLeftComponent(component))
      },
      registerRightComponent: component => {
        this.$nextTick(() => this.registerRightComponent(component))
      },
      registerFooterComponent: component => {
        this.$nextTick(() => this.registerFooterComponent(component))
      }
    }
  },
  methods: {
    init () {
      if (this.$refs.view) {
        this.setTitle(this.$refs.view.title || document.title)
        this.registerLeftComponent(this.$refs.view.leftComponent)
        this.registerRightComponent(this.$refs.view.rightComponent)
        this.registerFooterComponent(this.$refs.view.footerComponent)
        this.setStyle(this.$refs.view.style || {})
      }
    },
    setStyle (style) {
      this.ContainerStyle = style
    },
    setTitle (title) {
      this.title = title
    },
    /**
     * 设置标题左侧值
     * @param component vue-object | click-function
     * */
    registerLeftComponent (component) {
      if (component === false) this.leftComponent = false
      else {
        let click = () => this.$router.back()
        if (typeof component === 'function') {
          click = component
          component = null
        }
        this.leftComponent = component || {
          component: 'q-btn',
          props: {
            icon: 'ion-ios-tv',
            dense: true,
            rounded: true,
            unelevated: true
          },
          on: { click }
        }
      }
    },
    /**
     * 设置顶部右侧按钮值
     * @param component vue-object | render-function
     * */
    registerRightComponent (component) {
      if (typeof component === 'function') {
        component = {
          component: { render: component }
        }
      }
      this.rightComponent = component
    },
    /**
     * 设置底部组件
     * @param component vue-object | render-function
     * */
    registerFooterComponent (component) {
      if (typeof component === 'function') {
        component = {
          component: { render: component }
        }
      }
      this.footerComponent = component
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    $route () {
      this.$nextTick(() => this.init())
    }
  }
}
</script>
