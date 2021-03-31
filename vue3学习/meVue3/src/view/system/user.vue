<template>
  <div>备忘1录</div>
  {{ count }}
  <el-button @click="add" plain>新增</el-button>
  <el-button @click="jian" plain>删除</el-button>
</template>

<script >
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  // setup(props) {
 
   
  // },
  methods: {
    ...mapMutations(["increment"]),
    add() {
        // console.log(store);
      this.increment(true);
      console.log(1111);
    },
     jian() {
      this.increment(false);
    }
  },
  computed: {
    ...mapGetters(["count"]),
   
  },
};
</script>

<style>
</style>