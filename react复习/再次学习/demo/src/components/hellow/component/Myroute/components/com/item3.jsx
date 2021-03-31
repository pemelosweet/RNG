import React, { Component } from 'react'
export default class item extends Component {
    state={
        fillData:[
            {id:'1',contont:'你好，北京'},
            {id:'2',contont:'你好，馒头'},
            {id:'3',contont:'你好，两块'},
        ]
    }
    render() {
        var {id,name} =this.props.location.state||{}
        const text= this.state.fillData.find((el)=>{
            return el.id ===id
        })||{}
        return (
            <div>
            <ul>
                <li>名字：{name}</li>
                <li>id：{id}</li>
                <li>内容：{text.contont}</li>
            </ul>
            </div>
        )
    }
}
