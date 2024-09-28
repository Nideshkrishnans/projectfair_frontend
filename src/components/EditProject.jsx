import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserprojectApi } from '../services/allApi';
import { editResponceContext } from '../context/ContextShare';



function EditProject({ project }) {
  const {setEditResponce}=useContext(editResponceContext)
  //console.log(project);
  const [preview, setPreview] = useState("")


  const [projectDetails, setProjectDetails] = useState({
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImg: ""
  })

  //console.log(projectDetails.title);
  
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false); handleClose1()}
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    setProjectDetails(
      {
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImg: ""
      }
    )

    setPreview("")
  }

  useEffect(() => {
    if (projectDetails.projectImg) {
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }

  }, [projectDetails.projectImg])


  const handleEdit = async()=>{
    const {title,language,github,website,overview,projectImg}=projectDetails
    if(!title | !language | !github | !website | !overview){
      toast.info("please fill the form completely")
    }
    else{
      //formData class is used to send request with uploaded content
      //1)craete an object
      const reqBody = new FormData()

      //append() - add data to the object
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImg",project?.projectImg)

      const token = sessionStorage.getItem("token")
      if(token){
        if(preview){
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateUserprojectApi(project._id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success("edited successfully")
            handleClose()
            setEditResponce(result.data)
          }
          else{
            toast.error('somthing went wrong')
            handleClose()
          }
          
        }
        else{
          const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }

          const result = await updateUserprojectApi(project._id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success("edited successfully")
            handleClose()
            setEditResponce(result.data)
          }
          else{
            toast.error('somthing went wrong')
            handleClose()
          }
        }
      }

    }
    
  }




  return (
    <>
      <FontAwesomeIcon icon={faPenToSquare} className='text-info' onClick={handleShow} />

      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <label htmlFor='profImg'>
                <input type="file" id='profImg' style={{ display: 'none' }} key={preview} onChange={(e) => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} />
                <img src={preview ? preview : `${serverUrl}/uploads/${project?.projectImg}`} alt="no-image" className='w-100' />
              </label>

            </div>
            <div className="col-md-6">
              <div className='mb-3'>
                <input type="text" placeholder='title' value={projectDetails.title} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input type="text" placeholder='language' value={projectDetails.language} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input type="text" placeholder='github' value={projectDetails.github} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              </div>

              <div className='mb-3'>
                <input type="text" placeholder='website' value={projectDetails.website} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </div>

              <div className='mb-3'>
                <textarea placeholder='Overview' value={projectDetails.overview} rows={4} className='form-control' onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleEdit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={2000} theme="colored" position="top-center"/>

    </>
  )
}

export default EditProject