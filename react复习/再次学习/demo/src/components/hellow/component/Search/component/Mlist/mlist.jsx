import React, { Component } from 'react'
import './mlist.css'
import Bus from '@/eventBus'

export default class mlist extends Component {
    state={
        mess:''
    }
    componentDidMount(){
       this.Bus= Bus.addListener('changeSiblingsData', (msg) => {
            this.setState({
              mess: msg,
            });
          });
        
    }
    componentWillUnmount(){
        Bus.removeAllListeners(this.Bus)
    }
    render() {
        return (
            <div className='picbody'>
               <span>event传过来的值：{this.state.mess}</span>   
                {
                    this.props.data.length===0?[]:this.props.data.items.map((el)=>{
                        return (
                            <div className='picbox'  key={el.id} >
                            <a href={el.html_url}  rel='noreferrer' target='_blank'>
                            <img style={{width:"100px"}} alt='touxiang' src={el.avatar_url}></img>
                        <p>{el.login}</p>
                        </a>
                        </div>
                        )
                    })
                }

            </div>
        )
    }
}
