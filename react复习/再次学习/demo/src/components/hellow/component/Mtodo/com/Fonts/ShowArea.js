import React ,{useContext}from 'react';
import {ColorContext} from './Colors'
function ShowArea(){
    const colors =useContext(ColorContext).color
    return (<div style={{color:colors}}>字体颜色为{colors}</div>)

}
export default ShowArea