import React, { Component } from 'react'
import {  NavLink } from 'react-router-dom'
export default class mynavlink extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <NavLink  activeClassName='x1'  className='ggg' {...this.props}/>
            </div>
        )
    }
}
