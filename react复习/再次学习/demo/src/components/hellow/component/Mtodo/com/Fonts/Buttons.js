import React,{useContext} from 'react';
import {ColorContext} from './Colors'
function Buttons(){
    const {dispatch} =useContext(ColorContext)
    function changeColor(color){
        dispatch(color)
    }
    return (
        <div>
            <button onClick={()=>{changeColor('red')}}>红色</button>
            <button onClick={()=>{changeColor('yellow')}}>黄色</button>
            <button onClick={()=>{changeColor('black')}}>黑色</button>
        </div>
    )
}

export default Buttons