import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {
  const [username , setusername]=useState('')

  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      setusername(JSON.parse(sessionStorage.getItem("existinguser")).username)    
    }

  },[])
  
  return (
    <>
    <Header/>
    <div className="conrainer-fluid">
      <h3 className='ms-5'>Welcome <span className='text-warning'>{username}</span></h3>

      <div className="row mt-5">
        <div className="col-md-8 px-md-5">
          <Myproject/>
        </div>

        <div className="col-md-4 px-md-5">
          <Profile/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard