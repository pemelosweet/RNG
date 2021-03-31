import React, { Component } from 'react'
import './index.css'
import axios from 'axios'
import Bus from '@/eventBus'
export default class mhead extends Component {
    constructor(){
        super()
        this.ref1=React.createRef('')
        this.state={
            todolist:[]
        }
    }
    bus(){
        Bus.emit('changeSiblingsData',this.ref1.current.value );
    }
  search(){
    //   获取input的值
      var serachCode =this.ref1.current.value
      axios.get(`https://api.github.com/search/users?q=${serachCode}`).then((res)=>{
          this.setState({
            todolist: res.data
          })
          //给父亲传值
          this.props.getData(res.data)
      })
     
  }
    render() {
        return (
            <div className='userbox'>
               <p> 搜索github用户</p>
                <input ref={this.ref1} type="text" placeholder='输入关键字点击查找'/>
                <button  onClick={()=>{this.search()}} >查找</button>
                <button  onClick={()=>{this.bus()}} >eventbus传值</button>
            </div>
        )
    }
}
