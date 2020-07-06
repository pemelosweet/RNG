<template>
  <div class="table1">
     今天真的天气不错啊
     <!-- <p>啊啊啊</p>
     <div>撑开了吗</div> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {},
  data() {
    return {
      isActive:true,
      msg: "Welcome to Your Vue.js App",
      // 定义列表
      list: [
        { index: 1, name: "table1" },
        { index: 2, name: "table2" },
        { index: 3, name: "table3" },
        { index: 4, name: "table4" },
        { index: 5, name: "table5" },
        { index: 6, name: "table6" }
      ]
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
