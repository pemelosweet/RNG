<template>
  <div class="hello">
    <!-- 拖拽插件 -->
    <vuedraggable
      class="wrapper"
      v-model="list"
    >
      <!-- 过度效果 -->
      <transition-group>
        <div
          v-for="item in list"
          :key="item.index"
          class="item"
        >
          <!-- <el-table :data="tabs" style="width: 100%"></el-table> -->
          <!-- <div :class="{active:item.name}"> -->
          <div v-bind:class="item.name">
            {{item.name}}
            <table1 v-if="item.index===1" />
            <table2 v-if="item.index===2" />
            <table3 v-if="item.index===3" />
            <table4 v-if="item.index===4" />
            <table5 v-if="item.index===5" />
            <table6 v-if="item.index===6" />
          </div>
        </div>
      </transition-group>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from "vuedraggable";
import table1 from "@/components/table1.vue";
import table2 from "@/components/table2.vue";
import table3 from "@/components/table3.vue";
import table4 from "@/components/table4.vue";
import table5 from "@/components/table5.vue";
import table6 from "@/components/table6.vue";
export default {
  name: "HelloWorld",
  components: { vuedraggable, table1, table2, table3, table4, table5,table6 },
  props: {},
  data() {
    return {
      isActive: true,
      msg: "Welcome to Your Vue.js App",
      // 定义列表
      list: [
        { index: 6, name: "table1" },
        { index: 3, name: "table2" },
        { index: 4, name: "table3" },
        { index: 2, name: "table4" },
        { index: 5, name: "table5" },
        { index: 1, name: "table6" }
      ]
    };
  },
  mounted() {},
  // 更新事件
  updated() {
    console.log(this.list);
  },
  methods: {
    submit() {
      console.log(222222222);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 1200px;
  margin: 0 auto;
}
.item {
  margin-left: 20px;
  margin-bottom: 20px;
  float: left;
  width: 500px;
  height: 300px;
  background-color: #42b983;
  color: #ffffff;
}
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
