<template>
    <q-layout view="hHh Lpr fFf">
    <!-- 导航组件 -->
    <taskHeader />
    <!-- slider滑动组件 -->
    <rwSlider />
    </q-layout>
</template>

<script>
import taskHeader from './task-header'
import rwSlider from './task-content'
export default {
  data () {
    return {
    }
  },
  components: {
    taskHeader,
    rwSlider
  }
}
</script>

<style scoped>
</style>
