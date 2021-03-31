import React, { useRef ,useState } from 'react'
import axios from 'axios'


export default function Github() {
    const ref1 = useRef('')
    const [todolist, setList] = useState([])
 function search(){
    //   获取input的值
      var serachCode =ref1.current.value
      axios.get(`https://api.github.com/search/users?q=${serachCode}`).then((res)=>{
        let data = res.data
          setList(()=>{
              return  data
         })
         console.log(todolist);
      })
  }
    return (
        <div >
        <p> 搜索github用户</p>
         <input ref={ref1} type="text" placeholder='输入关键字点击查找'/>
         <button  onClick={()=>{search()}} >查找</button>
     </div>
    )
}

