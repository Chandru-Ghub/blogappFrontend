import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from './App'

const CreatePost = () => {

  const perdata = useContext(userContext);
  // console.log(perdata)
  const [title,setTitle] = useState()
  const [description,setDescription] = useState()
  const [file,setFile] = useState()
  const navigate = useNavigate();
  const handlePost =(e)=>{
      e.preventDefault();
      console.log(title,description,file.name)
      const formData = new FormData();
      formData.append('title',title)
      formData.append('description',description)
      formData.append('email',perdata.email)
      formData.append('name',perdata.name)
      formData.append('file',file)
      axios.post('https://blogapplication-2rkm.onrender.com/createPost',formData).then(res => {console.log(res)
               
            if(res.data =='success'){
              alert('post Added sucessfully')
              navigate('/home')
            }
            else{
              alert('To upload new post kindly Update your profile')
              navigate('/home')
            }
            
        })
        .catch(err => console.log(err));
  }
  return (
    <div>
      <div className='post'>
        <form onSubmit={handlePost} className='postForm' action="">
          <h3 >Upload new post</h3>
          <input onChange={(e)=>setTitle(e.target.value)} className='title' type="text" placeholder='Title of the post'/>
         <textarea onChange={(e)=>setDescription(e.target.value)} placeholder='Type here something about the post' name="" id="" cols="30" rows="10"></textarea>
         <input onChange={(e)=>setFile(e.target.files[0])} className='file' type="file" />
         <button>POST</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost