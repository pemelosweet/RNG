import React, { Component } from 'react'
// import Item from './item.jsx'  //第一种
// import Item2 from './item2.jsx'  //第二种
import Item3 from './item3.jsx'  //第二种
import { Route, Link } from 'react-router-dom'
export default class rc2 extends Component {
    state = {
        todoArr: [
            { name: '小明', id: '1', title: '信息1' },
            { name: '大嘴', id: '2', title: '信息2' },
            { name: '小蓝', id: '3', title: '信息3' },
        ]
    }
    goback(){
        this.props.history.go(-1)
    }
    goup(){
        console.log( this.props.history);
        this.props.history.go(1)
    }
    go1(el){
        this.props.history.push('/home/bg2/details',{...el})
    }
    replace1(el){
        this.props.history.replace('/home/bg2/details',{...el})
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.todoArr.map((el) => {
                        return <li key={el.id}>
                            {/* <Link to={`/home/bg2/${el.id}/${el.name}`}>{el.title}</Link> */}
                            {/* <Link to={`/home/bg2/?id=${el.id}&name=${el.name}`}>{el.title}</Link> */}
                            <Link  to={{pathname:'/home/bg2/details',state:{...el}}}>{el.title}</Link>
                            <button onClick={()=>{this.go1(el)}}>go用法</button>
                            <button onClick={()=>{this.replace1(el)}}>replace用法</button>
                        </li>
                    })}
                </ul>
                {/* 第一种params传参，通过：/id */}
                {/* <Route path='/home/bg2/:id/:name'  component={Item}/>  */}

                {/* 第二种search传参，通过：/?id  */}
                {/* <Route path='/home/bg2' component={Item2} /> */}
                {/* 第三种state传参*/}
                <Route path='/home/bg2/details'  component={Item3}/> 
                <button onClick={()=>{this.goback()}}>后退</button>
                <button onClick={()=>{this.goup()}}>前进</button>
            </div>

        )
    }
}
