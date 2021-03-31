import React, { useState, useEffect,useReducer } from 'react'
import ReactDOM from 'react-dom'
// const initialState = {count: 0};//可以从外部引入
import {initialState} from '@/redux/index'

function useCount(initValue) {
    const [count, setCount] = useState(initValue);
    return  [count,(i=1)=>{
        console.log(i,'21312');
        setCount(count+i)
    }]
}
function uselog() {
     console.log('试试');
}
export default function List(props) {
    const [count, addCount] = useCount(0);
    const [num, setNum] = useState(0);
    const [names, setName] = useState('默认');
    const [flag, setFlag] = useState(false)
    const {id} =props.match.params
    useEffect(() => {
        document.title = `You clicked ${count} times`;
        var timers = setInterval(() => {
            setNum((num) => {
                return num + 1
            })
        }, 1000);
        return () => {
            clearInterval(timers)
        }
    }, [count])
    uselog()
    const update = (flag) => {
        setFlag(!flag)
        flag ? setName('黄彬彬') : setName('张凯凯')

    }
    function add() {
        addCount(5)
    }
    function del(){
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
        // 用ruducer重写计数器
        function reducer(state,action){
            switch (action.type) {
                case 'increment':
                return  {count:state.count+1}
                case 'decrement':
                    return {count: state.count - 1}
                default:

            } 
        }
        const [state, dispatch] = useReducer(reducer, initialState )
        function add2() {
        dispatch( {type: 'increment'})
        }
        function del2(){
            dispatch({type: 'decrement'})
        }
    return (
        <div>
            <p>You clicked {count} 次 {names} {num}秒钟{id}</p>
            <button onClick={() => { update(flag) }}>修改id</button>
            <button onClick={() => { add() }}>增加</button>
            <button onClick={() => { del() }}>移除</button>
            <p>ruducer计数器{state.count}</p>
            <button onClick={() => { add2() }}>增加</button>
            <button onClick={() => { del2() }}>减少</button>
        </div>
    )
}
