import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from './App'

const Profile = () => {

  const perdata = useContext(userContext);
  // console.log(perdata)
  const[myProfile,setMyProfile] = useState([])
  const [username,setusername] = useState()
  const [bio,setBio] = useState()
  const [file,setFile] = useState()
  const [birth,setBirth] = useState();
  const navigate = useNavigate();
  const handlePost =(e)=>{
      e.preventDefault();
    //   console.log(title,bio,file.name)
      const formData = new FormData();
      formData.append('username',username)
      formData.append('bio',bio)
      formData.append('birth',birth)
      formData.append('email',perdata.email)
      formData.append('name',perdata.name)
      formData.append('file',file)
      axios.post('https://blogapplication-2rkm.onrender.com/profile',formData).then(res => {console.log(res)
               
            if(res.data =='success'){
              alert('profile Added sucessfully')
              navigate('/home')

            }
            
        })
        .catch(err => console.log(err));
  }

  useEffect(()=>{
        axios.get('https://blogapplication-2rkm.onrender.com/myprofile/'+perdata.email)
        .then(profile => {console.log(profile)
        
               setMyProfile(profile.data)
                setusername(profile.data[0].username)
                setBio(profile.data[0].bio)
                setBirth(profile.data[0].birth)
                setFile(profile.data[0].file)
        })
        .catch(err => console.log(err))
  },[])
  return (
    <div>
        <div className="profileStyle">
            {
                myProfile.reverse().slice(0,1).map((data,i)=>
                    <ul key={i}>
                        <img  className='dp' src={"https://blogapplication-2rkm.onrender.com/images/"+data.file} alt="profilePhoto" />
                        <li>{data.username}</li>
                        <li>{data.bio}</li>
                        <li>{data.birth}</li>

                    </ul>
                    )
            }
      </div>
      <div className='post'>
        <form onSubmit={handlePost} className='postForm' action="">
          <h3 >Update Your Profilet</h3>
          <input value={username} required onChange={(e)=>setusername(e.target.value)} className='title' type="text" placeholder=' User name'/>
         <input value={bio} onChange={(e)=>setBio(e.target.value)} className='title' placeholder='Bio about yourself'/>
         <input value={birth} onChange={(e)=>setBirth(e.target.value)} type='date' className='title'  />
         {/* <label htmlFor="profilePicture">Upload_Profile</label> */}
         <input onChange={(e)=>setFile(e.target.files[0])} id='profilePicture' className='file' type="file" />
         <button>UPDATE PROFILE</button>
        </form>
      </div>

      
    </div>
  )
}

export default Profile