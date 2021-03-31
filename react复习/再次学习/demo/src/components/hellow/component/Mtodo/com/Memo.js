import React, { useState, useMemo, useEffect, useCallback } from 'react'
import GetSize from './Fonts/GetSize'
export default function Memo() {
    const [x1, setx1] = useState('小红')
    const [x2, setx2] = useState('小紫')
    return (
        <div>
            <p>Usememo的用法</p>
            <button onClick={() => { setx1(new Date().getTime() + '你好啊，小红') }}>小红按钮</button>
            <button onClick={() => { setx2(new Date().getTime() + '你好啊，小紫') }}>小紫按钮</button>
            <button onClick={() => { }}>获取屏幕尺寸</button>
            <Display name={x1} name2={x2}>看看有什么变化</Display>
        </div>
    )
}
function Display(props) {
    const { children, name, name2 } = props
    useEffect(() => {
        console.log('只有在小红按钮变化');

    }, [name])
    // useCallback写法   
    const b1 =  useCallback(() =>name,[name])
    const m1 = b1()
    // useMemo写法
    // function getx1(name) {
    //     return name
    // }
    // const m1 = useMemo(() =>  getx1(name), [name])
    function getx2(name2) {
        console.log(name2,'小紫来了');
        return name2
    }
    const m2 = useMemo(() => getx2(name2), [name2])
    const size = GetSize()
    return (
        <>
            <div>页面Size:{size.width}x{size.height}</div>
            <div>{m1}</div>
            <div>{m2}</div>
            <div>{children}</div>
        </>
    )
}
