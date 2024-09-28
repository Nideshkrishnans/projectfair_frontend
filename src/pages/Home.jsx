import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../services/allApi'
import { serverUrl } from '../services/serverUrl'

function Home() {
  const [token,setToken]=useState()
  const [homeProject,setHomeProject] = useState([])

  const getHomeProject = async()=>{
    const result = await homeProjectApi()
    setHomeProject(result.data);
    
  }

  console.log(homeProject);
  

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    getHomeProject()
  },[])


  return (
    <>
    <div className='container-fluid bg-success p-4 mb-4' style={{width:'100%',height:'100vh'}}>
      <Row className='mt-5'>
        <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
        <div>
          <h1 className='text-light' style={{fontSize:'76px'}}>project Fair</h1>
          <h6>One stop destination for all software development projects</h6>
          {!token?<Link to={'/login'}><button className='btn btn-outline-light my-4'>Get Started <FontAwesomeIcon icon={faArrowRight} className='ms-2'/></button></Link>:
          <Link to={'/dashboard'}><button className='btn btn-outline-light my-4'>Manage Project <FontAwesomeIcon icon={faArrowRight} className='ms-2'/></button></Link>}
        </div>
        </Col>

        <Col md={6} className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <img src='https://websitebasics.com/_next/static/media/designer.10f23e7c.svg' alt="no images" width={'75%'} />
        </Col>
      </Row>

    </div>

    <div className='container-fluid'>
      <h1 className='text-center my-5'>Explore Our Projects</h1>

      <div className='row mb-5'>
        {homeProject?.length>0?
        homeProject?.map((item)=>(
          <div className='col-md-4 justify-content-center d-flex p-4'>
          <ProjectCard project={item}/>
        </div>
        ))
        :null
        }

      </div>
      <Link to={'/project'} className='text-danger'>
        <h5 className='text-center mt-5'>See more projects</h5>
      </Link>
    </div>
    </>
  )
}

export default Home