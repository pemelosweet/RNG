import React,{useState} from 'react'
import Head from './com/head.js'
import List from './com/list'
import Foot from './com/foot'
import Count from './com/Count'
import Font from './com/Font'
import Memo from './com/Memo'
import {MyContext,themes} from './com/context/base'
export default function Index() {
    const [list,setList] =useState([])
    function addList(obj){
        setList(() =>{
            let arr =[].concat(list)
            arr.unshift(obj)
            return  arr
        })
    }
    function updateList(obj){
        let arr =[].concat(list)
        arr.find((el,index,self)=>{
            if (obj.id===el.id) {
                self[index] =obj
            }
            return self
        })
        setList(()=>{
        return arr
        })
    }
    function setAll(flag){
        let arr =[].concat(list)
        arr.forEach(es=>{
            if (flag) {
                es.done=true
            }else{
                es.done=false
            }
          
        })
        setList(arr)
    }
    function del(){
      var c = list.filter((el)=>{
            return  !el.done
        })
        setList(c)
    }
    return (
        <div>
            <Head addList={addList}/>
            <List updateList={updateList} list={list}/>
            <MyContext.Provider value={themes}> <Foot  Flist={list} setAll={setAll} del={del}/></MyContext.Provider>
            <Count/>
            <Font/>
            <Memo/>
        </div>
    )
}
