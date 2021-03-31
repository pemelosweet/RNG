import React, { Component } from 'react'
import { Route, Switch, NavLink,Redirect } from 'react-router-dom'
import Rc from './com/rc'
import Rc2 from './com/rc2'
export default class home extends Component {
    render() {
        return (
            <div>
                <div>
                <NavLink activeClassName='x2' to='/home/bg1'>NEWs </NavLink>
                <NavLink activeClassName='x2' to='/home/bg2'>MESSAGE</NavLink>
                </div>
                <div>
                  <Switch>
                  <Route path='/home/bg1' component={Rc}></Route>
                  <Route path='/home/bg2' component={Rc2}></Route>
                  </Switch>
                  <Redirect to='/home'/>
                </div>
            </div>
        )
    }
}
