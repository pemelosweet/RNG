import  hellow from './index.module.css'
import Header from './component/Header/header.jsx'
import List from './component/List/list.jsx'
import Footer from './component/Footer/footer.jsx'
import Mtodo from './component/Mtodo/index.js'
import Search from './component/Search/search.jsx'
import Myroute from './component/Myroute/myroute.jsx'
import React, { Component } from 'react'
export default class index extends Component {
    state={
        todos :[
            {name:'吃饭',done:false,id:'001'},
            {name:'睡觉',done:false,id:'002'},
            {name:'打豆豆',done:true,id:'003'},
    ]
    }
    // add(todoObj){
    //     console.log(this,'this');// {add: ƒ}add: ƒ add(todoObj)__proto__: Object "this"  this指的是方法
    //     const  {todos}=this.state
    //     const newtodos = [todoObj,...todos]
    //     this.setState({
    //         todos:newtodos
    //         })
    // }
    add=(todoObj)=>{
        console.log(this,'this');   //这里的this是指 Header组件
        const  {todos}=this.state
        const newtodos = [todoObj,...todos]
        this.setState({todos:newtodos})
    }
    delt=(id)=>{
        console.log(id);
        const  {todos}=this.state
        var aa= todos.filter((els)=>{
            return  els.id !==id 
        })
        this.setState({
        todos:aa
        })
    }
    chnageTodo=(todoObj)=>{
        const  {todos}=this.state
       var arr= todos.map(es=>{
            if (es.id===todoObj.id) {
               es =todoObj
            }
                return es
        })
        this.setState({todos:arr})
    }
    allchange=(i)=>{
   const  {todos}=this.state
       var arr= todos.map(es=>{
           if (i) {
            es.done=true
           }else{
            es.done=false
           }
              
                return  es
        })
        this.setState({todos:arr})
    }
    alldel=(ids)=>{
        const  {todos}=this.state
        var arr =todos.concat()
      for (let i = 0; i < arr.length; i++) {
       ids.forEach((el)=>{
           if (el ===arr[i].id) {
              arr.splice(i,1)
            
           }
       })
      }
      this.setState({todos:arr})
    }
    render() {
        const  {todos}=this.state
        return (
           <div>
                <div  className={hellow.bg}>
                <div className={hellow.box}>
                <Header className={hellow.xx2} add={this.add}></Header>
                <List chnageTodo={this.chnageTodo}  todos={todos} delt={this.delt}/>
                <Footer  allchange={this.allchange}  todos={todos}  alldel={this.alldel}/>
                <p>下面是seach组件</p>
                <div className={hellow.seachBox}>
                <Search/>
                </div>
                <p>下面是路由切换</p>
                <Myroute/>
            </div> 
            </div>
             <Mtodo/>
           </div>
        )
    }
}
