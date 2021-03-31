import React,{useReducer} from 'react'
export default function Count() {
    const  [counts,dispatch] =useReducer((counts,action)=>{
        switch (action) {
            case 'add':
                return  counts+=1
            case 'sub':
              return  counts-=1
            default:
               return counts
        }
    },0)
    return (
        <div>
                {counts}
            <button onClick={()=>{dispatch('add')}}>add</button>
            <button onClick={()=>{dispatch('sub')}}>sub</button>
        </div>
    )
}
