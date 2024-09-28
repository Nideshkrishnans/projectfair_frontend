import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import EditProject from '../components/EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { deleteUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponceContext, editResponceContext } from '../context/ContextShare'


function Myproject() {
  const {addResponce}=useContext(addResponceContext)
  
  const [deleteStatus,setDeleteStatus]=useState(false)
  const [userProject , setUserProject]= useState([])
  const {editResponce}=useContext(editResponceContext)

  const getUserProject =async ()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader={
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await userProjectApi(reqHeader)
    setUserProject(result.data)
  }
  //console.log(userProject);

  const handleDelete= async(id)=>{
    const  result = await deleteUserProjectApi(id)
     if(result.status == 200){
        setDeleteStatus(true)
    } 
  }
  

  useEffect(()=>{
    getUserProject()
    setDeleteStatus(false)
  },[addResponce,deleteStatus,editResponce])
  return (
    <>
    <div className='shadow p-3 mb-3'>
      <div className='d-flex mt-4'>
        <h4 className='me-auto text-success'>My Projects</h4>
        <AddProject/>
      </div>

      {userProject?.length>0?
      userProject.map((item)=>(
        <div className='p-3 mt-4 d-flex rounded-2' style={{backgroundColor:'lightgray'}}>
        <h6>{item?.title}</h6>
        <div className='d-flex ms-auto align-items-center'>
          <EditProject project={item}/>
          <Link to={item?.website} target='_blank' ><FontAwesomeIcon icon={faGlobe} className='ms-3 text-warning'/></Link>
          <Link to={item?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='ms-3 text-successs'/></Link>
          <FontAwesomeIcon icon={faTrash} className='ms-3 text-danger'  onClick={()=>handleDelete(item?._id)}/>

        </div>
      </div>
      ))
        
      :
      <p>no projects to show</p> }

    </div>
    </>
  )
}

export default Myproject