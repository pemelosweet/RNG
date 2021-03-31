<template>
  <!-- <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div> -->
    <!-- <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="navbar" >
        <navbar />
     </div>
      <div class='appmain'>
      <app-main />
    </div>
  </div>
  </div> -->
   <div class="layout">
    
       <Sidebar class="leftcont" />
    
    
    <div class="rightcont">
      <div class="head" >
        <navbar />
     </div>
      <div class='content'>
      <app-main />
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar/index.vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/mains/index.vue";
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
};
</script>
<style lang="scss" scoped>
body {
  overflow: hidden;
  height: 100%;
}
.layout {
  width: 100%;
  position: absolute;
  display: flex;
  height: 100%;
}
.leftcont {
    transition: width .28s;
    width: 210px !important;
    background-color: rgb(255, 255, 255);
    height: 100%;
    position: fixed;
    // font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

  
}
.rightcont {
  width: 100%;
  margin-left: 210px;
}
.head {
  width: 100%;
  height: 50px;
  // background:  rgb(241, 196, 196);;
  line-height: 50px;
  text-align: left;
}
.content {
   width: 100%;
  background:  rgb(170, 168, 168);;
 height: 90%
}
</style>


