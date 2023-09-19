import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {

  const [title,setTitle] = useState()
  const [description,setDescription] = useState()
  const navigate = useNavigate();
  const {id} = useParams();
//   console.log(id)
  useEffect(()=>{
    axios.get('https://blogapplication-2rkm.onrender.com/getpostbyid/'+id)
    .then(result =>{
        // console.log(result.data);
        setTitle(result.data.title)
        setDescription(result.data.description)
    })
    .catch(err => result)
},[])

  const handlePost =(e)=>{
      e.preventDefault();
    //   console.log(title,description,file.name)
     
      axios.put('https://blogapplication-2rkm.onrender.com/editpost/'+id,{title,description}).then(res => {console.log(res)
               
            if(res.data =='success'){
              alert('post Updated sucessfully')
              navigate('/home')

            }
            
        })
        .catch(err => console.log(err));
    }

  

  return (
    <div>
      <div className='post'>
        <form onSubmit={handlePost} className='postForm' action="">
          <h3 >Edit Post</h3>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className='title' type="text" placeholder='Title of the post'/>


         <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Type here something about the post' name="" id="" cols="30" rows="10"></textarea>
         {/* <input onChange={(e)=>setFile(e.target.files[0])} className='file' type="file" /> */}
         <button>UPDATE POST</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost