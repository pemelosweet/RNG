import React, { Component } from 'react'

export default class index extends Component {
    constructor(){
        super()
        this.c1 =React.createRef('')
    }
    state={
        tmd:false
    }
    mouse(g) {
        this.setState({
            tmd:g
        })
    }
    del(id){
        if (window.confirm('删除吗')) {
            this.props.del(id) 
        }
        
    }
    change(el) {
      var obj ={
        name:el.name,
        done:this.c1.current.checked,
        id:el.id
       }  
       console.log(obj,'kankan');
       this.props.chnageTodo(obj)
      
     }
    render() {
        const el =this.props
        return (
            <div>
                <li style={{background: this.state.tmd?'red':'',height:'30px'}} onMouseEnter={() => { this.mouse(true) }} onMouseLeave={() => { this.mouse(false) }} key={el.id}>
                                <label style={{float:'left'}}>
                                    <input type="checkbox" ref={this.c1} onChange={() => { this.change(el) }} checked={el.done} />
                                    <span>{el.name}</span>
                                </label>
                                <button onClick={()=>{this.del(el.id)}} style={{ display: this.state.tmd?'block':'none' }}>删除</button>
                </li>
            </div>
        )
    }
}
