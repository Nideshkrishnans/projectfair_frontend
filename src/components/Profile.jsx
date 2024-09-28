import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { profileUpdateApi} from '../services/allApi';


function Profile() {
  const [open, setOpen] = useState(false);
  const [userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:"",
    github:"",
    linkedin:"",
    Profile:""
  })

  const [existingImage,setExistingImage]=useState("")
  const [preview,setPreview]=useState('')
  const [updateStatus,setUpdateStatus]=useState({})

  const handleFile=(e)=>{
    setUserDetails({...userDetails,Profile:e.target.files[0]})
  }

  useEffect(()=>{
    if(userDetails.Profile){
      setPreview(URL.createObjectURL(userDetails.Profile))
    }
  },[userDetails.Profile])
  console.log(preview);

  const handleUpdate = async()=>{
    const {username, email, password, github,linkedin,Profile}=userDetails
    if(!github || !linkedin){
      toast.info('please fill the form completely')
    }
    else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profile",Profile):reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")

      if(token){
        if(preview){
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await profileUpdateApi(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('profile update successfully')
            sessionStorage.setItem("existinguser",JSON.stringify(result.data))
            setUpdateStatus(result.data)

          }
          else{
            toast.error('something went wrong')
          }
          
        }
        else{
          const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await profileUpdateApi(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success('profile update successfully')
            sessionStorage.setItem("existinguser",JSON.stringify(result.data))
            setUpdateStatus(result.data)
          }
          else{
            toast.error('something went wrong')
          }
        }
      }
    }
  }
  

  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const user =JSON.parse(sessionStorage.getItem("existinguser"))
      setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
      setExistingImage(user.Profile)
    }
  },[updateStatus])

  console.log(userDetails);
  

  return (
    <>
    <div className="shadow p-3 mb-3" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>

      <div className='d-flex mt-3' >
        <h4>Profile</h4>
        <div className='ms-auto'>
          <button onClick={() => setOpen(!open)} className='btn btn-outline-primary'>{open?<FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faAngleDown} />}</button>
        </div>
      </div>


      <Collapse in={open}>
  
        <div>
          <div className='d-flex justify-content-center align-items-center'>
            <label htmlFor='userimg'>
              <input type="file" id='userimg'  style={{display:'none'}} onChange={(e)=>handleFile(e)}/>
              {
                existingImage==""?
                <img src={preview?preview:'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1717200000&semt=ais_usery'} alt="no imaga" width={'180px'} height={'180px'} style={{borderRadius:'50%'}}/> :

                <img src={preview?preview:`${serverUrl}/uploads/${existingImage}`} alt="no imaga" width={'180px'} height={'180px'} style={{borderRadius:'50%'}}/>
              }
            </label> 
          </div>
    
          <div className='mb-3'>
            <input type="text" value={userDetails.github} placeholder='github' className='form-control' onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} />
          </div>
    
          <div className='mb-3'>
            <input type="text" value={userDetails.linkedin} placeholder='linkedin' className='form-control' onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} />
          </div>
    
          <div className='mb-3'>
            <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
          </div>
        </div>
  
      </Collapse>
    </div>

    <ToastContainer autoClose={2000} theme="colored" position="top-center"/>

    </>
  )
}

export default Profile