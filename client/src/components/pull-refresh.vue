<script>
import pullRefresh from 'vant/lib/pull-refresh'
export default {
  extends: pullRefresh,
  methods: {
    onTouchEnd () {
      let distance = this.distance
      if (!this.untouchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration

        if (this.status === 'loosing') {
          this.setStatus(this.headHeight, true)
          this.$emit('input', true) // ensure value change can be watched

          this.$nextTick(() => this.$emit('refresh', distance))
        } else {
          this.setStatus(0)
        }
      }
    }
  }
}
</script>
