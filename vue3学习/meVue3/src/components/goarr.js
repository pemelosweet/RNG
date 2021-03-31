import { reactive} from 'vue'
function goarr(){
    let stateArr =reactive({stus:[{a:1},{b:2}]}) //引用
    function updateArr(){
        console.log(8888);
        stateArr.stus=[1,3,4,5]
    }
    return {stateArr,updateArr}
  }
  export default goarr