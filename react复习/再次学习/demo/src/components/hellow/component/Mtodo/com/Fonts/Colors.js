import React,{createContext,useReducer} from 'react'
export const ColorContext = createContext({})
export  function Colors(props) {
    const [state, dispatch] = useReducer((state,action)=>{
        switch (action) {
            case 'red':
                return state='red'
            case 'yellow':
                return state='yellow'
            default:
                return  state='black';
        }
    }, 'black')
    return (
        <ColorContext.Provider value={{color:state,dispatch}} >
            {props.children}
        </ColorContext.Provider>
    )
}
