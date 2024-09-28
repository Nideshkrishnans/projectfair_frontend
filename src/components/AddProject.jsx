import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponceContext } from '../context/ContextShare';

function AddProject() {
  const [show, setShow] = useState(false);
  const[projectDetails,setProjectDetails]=useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImg:""

  })
  //console.log(projectDetails);

  const[preview,setPreview]=useState("")

  const {setAddResponce} = useContext(addResponceContext)
  
  const handleClose = () => {setShow(false); handleClose1()}
  const handleShow = () => setShow(true);


  useEffect(()=>{
    if(projectDetails.projectImg){
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }

  },[projectDetails.projectImg])

  const handleClose1=()=>{
    setProjectDetails(
      {
        title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImg:""
      }
    )

    setPreview("")
  }

  const handleAdd= async ()=> {
    const {title,language,github,website,overview,projectImg} = projectDetails

    if(!title||!language||!github||!website||!overview||!projectImg){
      toast.info('please fill the form completly')
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
      reqBody.append("projectImg",projectImg)

      const token = sessionStorage.getItem("token")

      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }

        const result = await addProjectApi(reqBody,reqHeader)
        //console.log(result);

        if(result.status==200){
          setAddResponce(result.data)
          toast.success('project added successfully')
          handleClose()
        }
        else{
          toast.error('something went wrong')
          handleClose()
        }
        
      }
    }
  }


  return (
    <>
    <button className='btn btn-success ' onClick={handleShow}>Add project</button>

    <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <label htmlFor='projimg'>
                <input type="file" id='projimg' style={{display:'none'}} key={preview} onChange={(e)=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})}/>
                <img src={preview?preview:"https://repository-images.githubusercontent.com/229240000/2b1bba00-eae1-11ea-8b31-ea57fe8a3f95" }alt="no-image" className='w-100' />
              </label>
             
            </div>
            <div className="col-md-6">
                <div className='mb-3'>
                  <input type="text" placeholder='title' className='form-control' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                </div>

                <div className='mb-3'>
                  <input type="text" placeholder='language' className='form-control' value={projectDetails.language}  onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
                </div>

                <div className='mb-3'>
                  <input type="text" placeholder='github' className='form-control' value={projectDetails.github}  onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
                </div>

                <div className='mb-3'>
                  <input type="text" placeholder='website' className='form-control' value={projectDetails.website}  onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
                </div>

                <div className='mb-3'>
                  <textarea placeholder='Overview' rows={4} className='form-control' value={projectDetails.overview}  onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
                </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
    </Modal>
    <ToastContainer autoClose={2000} theme="colored" position="top-center"/>

    </>
  )
}

export default AddProject