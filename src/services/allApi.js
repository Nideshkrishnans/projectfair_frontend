import { commomApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

//register
export const registerApi=async(reqBody)=>{
    return await commomApi('POST',`${serverUrl}/register`,reqBody,"")
}

//login
export const loginApi=async(reqBody)=>{
    return await commomApi('POST',`${serverUrl}/login`,reqBody,"")
}

//add project
export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commomApi('POST',`${serverUrl}/add-project`,reqBody,reqHeader)
}

//home project

export const homeProjectApi = async()=>{
    return await commomApi('GET',`${serverUrl}/home-project`,"","")
}

//all-project

export const allProjectApi = async(searchKey)=>{
    //syntax - url?key=value
    return await commomApi('GET',`${serverUrl}/all-project?search=${searchKey}`,"","")
}

//api for userproject
export const userProjectApi = async (reqHeader)=>{
    return await commomApi ('GET',`${serverUrl}/user-project`,"",reqHeader)
}

//api to delete project
export const deleteUserProjectApi = async (id)=>{
    return await commomApi ('DELETE',`${serverUrl}/remove-userproject/${id}`,{},"")
}

//api to edit user project
export const updateUserprojectApi=async(id,reqBody,reqHeader)=>{
    return await commomApi ('PUT',`${serverUrl}/edit-project/${id}`,reqBody,reqHeader)
}

//api to update profile
export const profileUpdateApi=async(reqBody,reqHeader)=>{
    return await commomApi ('PUT',`${serverUrl}/update-profile`,reqBody,reqHeader) 
}

