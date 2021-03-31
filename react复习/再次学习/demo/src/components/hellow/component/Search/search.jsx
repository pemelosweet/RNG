import React, { Component } from 'react'
import Mhead from '../Search/component/Mhead/mhead'
import Mlist from '../Search/component/Mlist/mlist'
export default class search extends Component {
    constructor(){
        super()
        this.heads =React.createRef('')
        this.state={
            listData:[]
        }
    }
    //获取data
     getData=(data)=>{
         this.setState({
            listData:data
         })
     }
    render() {
        return (
            <div>
                 <Mhead ref={this.heads} getData={this.getData}  />
                 <Mlist  data={this.state.listData}/>
            </div>
        )
    }
}
