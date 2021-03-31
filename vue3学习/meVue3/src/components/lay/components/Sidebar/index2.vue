<template>
  <div>
    <div class="logo">
      <img alt="Vue logo" src="/@/assets/logo.png" />
    </div>
    <div>
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <!-- <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template v-slot:title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <span>分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span>导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span>导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span>导航四</span>
        </el-menu-item>
      </el-menu> -->
      <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
          <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span>导航四</span>
        </el-menu-item>
        <sidebar-item v-for="route in mljrouters" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from '/@/components/lay/components/Sidebar/sinder.vue'
import variables from '/@/styles/variables.scss'

export default {
  components: { SidebarItem },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  computed:{
    ...mapGetters([
      'mljrouters'
    ]),
      activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
       // 可以在路由配置文件中设置自定义的路由路径到meta.activeMenu属性中，来控制菜单自定义高亮显示
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 样式
      variables() {
      return variables
    },
  }


};
</script>
<style lang='less' scoped>
.logo {
  background: cadetblue;
  width: 210px;
  height: 10%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>