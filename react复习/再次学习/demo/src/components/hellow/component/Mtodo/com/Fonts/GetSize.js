import {useState,useEffect,useCallback} from 'react'
export default function useSize() {
    const [size,getsize] =useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight,
    })
    console.log(size,'size');
   const autoSize = useCallback(
        () => {
            console.log('执行不');
            getsize({
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight,
            })
        },
        [],
    )
    useEffect(() => {
        console.log('进来了');
        document.addEventListener('resize',autoSize)
        return () => {
        document.removeEventListener('resize',autoSize)
        }
    })
    return  size
}
