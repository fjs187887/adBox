<style scoped lang="less">@import './index.less';</style>
<template>
  <div class="loading-state" :class="{'align-center':center}" :style="sizeStyle">
    <Spin fix>
      <div class="loader" :style="sizeStyle">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
        </svg>
      </div>
    </Spin>
  </div>
</template>
<script>
export default {
  props: ['center', 'size'],
  computed: {
    sizeStyle () {
      if (!isNaN(this.size) && this.size !== null) {
        return {
          width: `${this.size}px`,
          height: `${this.size}px`
        }
      }
      return {}
    }
  }
}
</script>
