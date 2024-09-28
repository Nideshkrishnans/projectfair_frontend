import axios from 'axios'

export const commomApi =async(reqmethod , url, reqBody, reqheader)=>{
    const reqConfiq={
        method:reqmethod,
        url,
        data:reqBody,
        headers:reqheader?reqheader:{"Content-Type":"application/json"}
    }

    return await axios(reqConfiq).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}