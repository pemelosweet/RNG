<template>
  <div class="scroll-container" ref="scrollContainer" @mousewheel="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const padding = 15
export default {
  name: 'scrollBar',
  data() {
    return {
      left: 0
    }
  },
  methods: {
    handleScroll(e) {
      // e.preventDefault()
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + e.wheelDelta)
      } else {
        if ($containerHeight - padding < $wrapperHeight) {
          if (this.left < -($wrapperHeight - $containerHeight + padding)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left + e.wheelDelta, $containerHeight - $wrapperHeight - padding)
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer
      const $containerWidth = $container.offsetWidth
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if (
        $targetLeft + padding > -this.left &&
        $targetLeft + $targetWidth < -this.left + $containerWidth - padding
      ) {
        // tag in the current view
        // eslint-disable-line
      } else {
        // tag in the right
        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    position: absolute;
    width: 100% !important;
  }
}
</style>
