
import React, { Component } from 'react'

export default class footer extends Component {
    constructor(){
        super()
        this.m =React.createRef('')
    }
    change(){
        if (this.m.current.checked) {
            this.props.allchange(true)
        }else{
            this.props.allchange(false)
        }
       
    }
    alldel(){
        const { todos} = this.props
        var arr =[]
        todos.forEach(el=>{
            if (el.done) {
                arr.push(el.id)
            }
        })
         this.props.alldel(arr) 
    }
    render() {
        const { todos} = this.props
        var succ =0
        var sum =todos.length
        todos.forEach(el=>{
            if (el.done) {
                succ++
            }
        })
        return (
            <div>
            <input ref={this.m} checked={succ===sum} onChange={()=>{this.change()}}  type="checkbox"/>已完成{succ}/全部{sum}
            <button onClick={()=>{this.alldel()}}>  清除已完成的任务</button>
        </div>
        )
    }
}

