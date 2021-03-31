import {createContext} from 'react'
const themes ={theme:"red",toggle:(val)=>{console.log(val);}}
const  MyContext=createContext(themes)
export{
    themes,
    MyContext
}