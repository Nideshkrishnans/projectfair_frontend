import React, { useState } from 'react'
import { createContext } from 'react'

export const addResponceContext = createContext({})
export const editResponceContext = createContext({})
export const isLoginAuthContext = createContext(false)

function ContextShare({children}) {
    //children is predefined props to share data
    const [addResponce,setAddResponce]=useState({})
    const [isLoginStatus,setIsLoginStatus] = useState(true)
    const [editResponce,setEditResponce]=useState({})
  return (
    <addResponceContext.Provider value={{addResponce,setAddResponce}}> {/* provider tad to share that data - where shared data should placed inide the value atribute as key:value pairs */}
       <isLoginAuthContext.Provider value={{isLoginStatus,setIsLoginStatus}}> 
        <editResponceContext.Provider value={{editResponce,setEditResponce}}>
          {children}
          </editResponceContext.Provider>
      </isLoginAuthContext.Provider>
    </addResponceContext.Provider>
  )
}

export default ContextShare