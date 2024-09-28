import React, {useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { isLoginAuthContext } from '../context/ContextShare';

function Header() {

  const navigate = useNavigate()
  const {setIsLoginStatus} = useContext(isLoginAuthContext)

  const [token , setToken]=useState('')

  const logout =()=>{
    sessionStorage.removeItem("existinguser")
    sessionStorage.removeItem("token")
    setIsLoginStatus(false)
    navigate('/')

  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  })

  return (
    <div>
      <Navbar className="bg-success">
        <Container>
          <Navbar.Brand href="#home">
           
          <Link to={'/'} ><h4 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='fa_2x'/>Project fair</h4></Link>
          </Navbar.Brand>

         {token && <button onClick={logout} className='btn btn-warning'><FontAwesomeIcon icon={faPowerOff} className='me-2'/>Logout</button>}
        </Container>
      </Navbar>

    </div>
  )
}

export default Header