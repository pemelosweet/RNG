import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import {initialState} from '@/redux/index'
export default class header extends Component {
    down(e){
        const {keyCode,target} =e
        if (target.value.trim()==='') {
            alert('输入不能为空')
            return
        }
        if (keyCode===13) {
         var obj ={
          name:target.value,
          done:false,
          id:nanoid()
         }  
         this.props.add(obj)
            target.value=''
        }
    }
    render() {
        return (  
            <div  style={{height:'50px'}}>
              <input onKeyUp={(e)=>{this.down(e)}} placeholder='请输入' type="text"/>
              {initialState.count}
        </div>
        )
    }
}

