<template>

  <div class="layout">
    <div  class="leftcont">
      222
  </div>
    <div class="rightcont">
      <div class="head">
        <router-link to="/home">Home</router-link> |
        <router-link to="/user">About</router-link>|
        <router-link to="/home">Home</router-link> |
        <router-link to="/home">Home</router-link> |
        <router-link to="/home">Home</router-link> |
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
      value1:true,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
  height: 100%;
}
.layout {
  display: flex;
}
.leftcont {
    transition: width .28s;
    width: 210px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;

    // background: red;
}
.rightcont {
  width: 100%;
}
.head {
  width: 100%;
  height: 50px;
  background: grey;
  line-height: 50px;
  text-align: left;
}
.content {
  background: forestgreen;
  height: 100%;
}
</style>