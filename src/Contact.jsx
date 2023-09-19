import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Contact = () => {

  const[user,setUser] = useState([])
  useEffect(()=>{

    axios.get('https://blogapplication-2rkm.onrender.com/getUser')
    .then(users=>setUser(users.data))
    .catch(err=>console.log(err))

},[])

  return (
    <div>Contact

      {
        user.map((a,i)=>
        <div className='userCol' key={i}>
          <ul className='userList' >
            <li>{a.name}</li>
            <li>{a.email}</li>
          </ul>
        </div>  
          )
      }
    </div>
  )
}

export default Contact