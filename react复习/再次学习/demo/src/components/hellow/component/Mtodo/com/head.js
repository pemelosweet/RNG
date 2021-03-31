import React,{ useRef } from "react"
import {nanoid} from 'nanoid'
export default function Head(props) {
    const {addList} =props
    const  ref1 =useRef('')
    function add(e){
      if (e.keyCode===13) {
          const obj ={
              id:nanoid(),
              title:e.target.value,
              done:false
          }
          addList(obj)
          ref1.current.value=''
      }
    }
    return (
        <div>
           搜索框<input onKeyUp={(e)=>{add(e)}} ref={ref1}/>
        </div>
    )
}
