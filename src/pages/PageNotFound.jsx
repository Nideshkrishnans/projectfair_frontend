import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div style={{width:'100%', height:'100vh'}} className='d-flex justify-content-center align-items-center flex-column' >
            <img src="https://www.scopycode.com/includes/images/blog/404_error_page_not_found.gif" alt="" />
            <br />
            <Link to={'/'}><button className='btn btn-success mt-5'>Back Home</button></Link>
    </div>
  )
}

export default PageNotFound