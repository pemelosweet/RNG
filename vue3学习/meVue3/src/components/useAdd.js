import {onMounted,onUpdated,onUnmounted, ref} from 'vue'
// 新增方法 这个方法也可以写到js文件中 通过import导入
function useAdd(){
    const setupNum =ref(18)
    function setupAdd(){
      setupNum.value++
    }
    onMounted(() => {
      console.log('mounted!初始化')
    })
    onUpdated(() => {
      console.log('updated!有变化的时候')
    })
    
    onUnmounted(() => {
      console.log('unmounted!销毁的时候')
    })
    return {setupNum,setupAdd}
  }
  export default useAdd