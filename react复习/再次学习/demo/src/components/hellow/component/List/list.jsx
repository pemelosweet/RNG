import React, { Component } from 'react'
import Item from '../Item/index'
import axios from 'axios'
export default class list extends Component {
    componentDidMount(){
        axios.post('/api/ADMIN-SERVICE/api/common/login',{
            useType: 1,
            mobileNum: '15611287561',
            password:"123qwe"
          }).then((res)=>{
            console.log(res.data);
        })
    }
    render() {
        const { todos,delt,chnageTodo} = this.props
        return (
            <div style={{ height: '300px' }}>
                <ul>
                    {todos.map((el) => {
                        return (
                        <Item {...el} key={el.id} del={delt} chnageTodo={chnageTodo}/> 
                        )
                    })}
                </ul>
            </div>
        )
    }
}
