import React, { Component } from 'react'
import  './index.css'
import Home from './components/home'
import List from './components/list'
import { Route,  NavLink,Switch,Redirect } from 'react-router-dom'
import MyNavList from './components/mynavlink'
export default class myroute extends Component {
    render() {
        return (
            <div className='rtbox'>
                <p className='heads'>点击按钮实现路由切换</p>
                <div className='mainbox'>
                    <div className='left'>
                        <NavLink  activeClassName='x1' className='ggg ' to='/home'>首页</NavLink>
                        {/* <NavLink activeClassName='x1'  className='ggg' to='/list'>列表</NavLink> */}
                        <MyNavList to='/list/18'>列表</MyNavList>
                       {/* <button  onClick={()=>{this.gethome()}}>首页</button>
                       <button  onClick={()=>{this.getlist()}}>列表</button> */}
                       
                    </div>
                    <div className='right'>
                        <Switch>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/list/:id' component={List}></Route>
                        <Redirect to='/home'/>
                        </Switch>
                       
                    </div>
                </div>
            </div>
        )
    }
}
