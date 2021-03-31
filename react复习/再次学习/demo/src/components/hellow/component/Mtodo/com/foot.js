import React,{useRef,useContext}from 'react'
import Github from './github'
import {MyContext} from './context/base'
export default function Foot(props) {
    const ref2=useRef('')
    const { Flist,setAll,del} = props
    const allLen =Flist.length
    var num =0
    const context = useContext(MyContext)
    console.log(context.theme,'通过上下文拿到的');
    Flist.forEach(el => {
       if (el.done) {
        num++
       }
    });
    function changeAll(){
        setAll(ref2.current.checked)
    }
    function delFish(){
        del()
    }
    return (
        <div>
        <input ref={ref2} type='checkbox' onChange={()=>{changeAll()}}/>
    <span>已完成{num}/全部{allLen}</span>
        <button onClick={()=>{delFish()}}>清除已完成的任务 </button>
        <Github/>
        </div>
    )
}
