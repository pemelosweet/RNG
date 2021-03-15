<template>
  <div @click="toggleClick">
    <svg-icon v-if="isActive" icon-class="shrink" class="hamburger"/>
    <svg-icon v-if="!isActive" icon-class="unfold" class="hamburger"/>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger {
    display: inline-block;
    cursor: pointer;
    font-size: 26px;
    width: 2em;
    // height: 28px;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
}
.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
