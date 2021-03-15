<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :collapse-transition="false"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"> <!--#304156-->
        <div :class="{logo:!isCollapse,logoStyle:isCollapse}"><img :src="urlLogo" /></div>
        <sidebar-item :routes="permission_routers"></sidebar-item>
      </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import urlLogo from '@/assets/sidebar/logo.png'

export default {
  components: {
    SidebarItem
  },
  data() {
    return {
      val: '',
      isShow: false,
      urlLogo
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    // console.log(this.permission_routers, 444444444444)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.logo {
  text-align: center;
  margin:20px 10px 0;
  padding-bottom:20px;
  border-bottom: 1px solid #8fa2cd;
  transform: rotate(0deg);
  transition: 0.5s;
  transform-origin: 50% 50%;
  & img {
    width: 100px;
    height: auto;
  }

}
.logoStyle {
  text-align: center;
  padding: 7px 0px;
  border-bottom: 1px solid #ccc;
  & img {
    width: 42px;
    height: auto;
  }
}
</style>
