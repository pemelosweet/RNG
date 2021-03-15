<template>
  <div class="app-wrapper" :class="classObj">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div> -->
    <!-- <split-pane ref="splitwrap" class="splitwrap" v-on:resize="resize" :min-percent='3' :default-percent='15' split="vertical">
      <template slot="paneL">
        <sidebar class="sidebar-container" @add-parent-isCollapse='toggle()'></sidebar>
      </template>
      <template slot="paneR"> -->
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
          <navbar></navbar>
          <app-main></app-main>
          <!-- <app-footer></app-footer> -->
        </div>
      <!-- </template>
    </split-pane> -->
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'
// import splitPane from '@/components/SplitPane' // 拖拽组件
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  // AppFooter
  },
  mixins: [ResizeMixin],
  props: {
    minPercent: Number,
    percent: Number
  },
  data() {
    return {}
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
