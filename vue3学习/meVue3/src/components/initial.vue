<template>
  <h1 >{{ msg }}</h1>
  <h2>{{ setupNum }}</h2>
  <span v-pre>{{ this will not be compiled }}</span>
  <button @click="setupAdd">setupNum is: {{ setupNum }}</button>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  {{ stateArr }}
  <button @click="updateArr">修改数组</button>
  <span ref="box1"></span>
  <button @click="x1">x1</button>
   <router-link to="/aaa">Go to Home</router-link>
  <child :counts='setupNum' />
   <router-view></router-view>
</template>
<script lang='ts'>
import { ref } from "vue";
import goarr from "./goarr"; // 从js引入修改
import useAdd from "./useAdd";
// import goarr from "/@/components/goarr"; // 从js引入修改
// import useAdd from "/@/components/useAdd";
import Child from './Child.vue'

var ts:string ='可以吗'
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      submit: "",
    };
  },
components:{
  Child
},
  setup() {
    console.log(ts);
    const box1 = ref(null);
    // 在3x中我们可以通过ref函数使任何响应式变量在任何地方生效
    // ref只适用监听基本数据类型，reactive适用于监听引用数据类型（对象,数组）
    // setup会替代created和beforecreated，在官方文档中说明setup函数是围绕他们进行
    // setup中一般不建议使用this，this在setup中可能导致混淆
    // setup中的数据如果想要在页面上使用，必须要通过return将其暴露到全局中
    // 如果要将生命周期注册到setup中，需在生命周期前面加on以做区别 eg：onMounted
    // 生命周期 befordestory 和destory 改名为onBeforeMount和unmounted
    // 引用useAdd要注意要写到script同级，而不是export default中
    //setup中不支持使用异步，有异步操作可以移至mounted中执行
    //reactive是v3提供的实现引用数据响应式的方法，利用proxy实现，注意点：
    /*
    1.reactive必须是对象（json（它就是obj）/arr）
    2.如果reactive传入了其他对象，（eg Date） 需要通过重新赋值的赋值的才可以更新页面
     */
    let count = ref(0); //基本
    let { setupNum, setupAdd } = useAdd(); // 新增方法
    let { stateArr, updateArr } = goarr(); // 修改数组
    return { stateArr, count, setupNum, setupAdd, updateArr };
  },
  methods: {
    x1() {
      this.updateArr();
    },
  },
  renderTracked({ key, target, type }) {
    if (key === "msg") {
      console.log({ key, target, type }, "renderTracked");
    }
  },
   renderTriggered({ key, target, type }) {
    console.log({ key, target, type })
  },
  //对传入的参数就行一个判断处理
  emits: {
    submit: (payload) => {
      console.log(payload, "xxx");
      if (payload.email && payload.password) {
        return true;
      } else {
        console.warn(`Invalid submit event payload!`);
        return false;
      }
    },
  },
  mounted() {
   
    console.log(this.$route,'router');
    console.log(this.$refs.box1,'xxx')
    console.log(this.$parent,'ffff')
    this.$emit("submit", { email: this.msg, password: "dddd" });
  },
};
</script>
<style lang="less" scoped>
   h1{
     color: red
   }
</style>
