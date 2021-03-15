<template>
  <section class="app-main">
    <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->
    <transition name="fade" mode="out-in">
      <router-view>
      </router-view>
    </transition>
  </section>
</template>

<script>

import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  data() {
    return {
    }
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  methods: {

  }
}
</script>
<style>
  .el-breadcrumb {
    margin-left:20px;
  }
  .app-breadcrumb.el-breadcrumb {
    padding-left:20px;
  }
</style>
