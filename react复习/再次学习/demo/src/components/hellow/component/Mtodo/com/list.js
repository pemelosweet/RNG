import React from 'react'

export default function List(props) {
    const { list,updateList } = props
    function change(el){
        el.done=!el.done
        updateList(el)
    }
    return (
        <div>
            <ul >
                {
                    list.map(el => {
                        return (
                            <>
                                <li key={el.id}>
                                    <input  type='checkbox' checked={el.done}  onChange={()=>{change(el)}} />
                                    {el.title}
                                </li>
                            </>
                        )
                    })
                }
            </ul>
        </div>
    )
}
