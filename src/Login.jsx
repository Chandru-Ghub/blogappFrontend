import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({setProtect}) => {
    const [email,setEmail] = useState();
    const [password,setpass] = useState();
    const [wrgmail,setwrgmail] = useState();
    const [wrgpass,setwrgpass] = useState();
    const navigate = useNavigate()
     //Used to acess cookie in the backend
    axios.defaults.withCredentials = true;
    function handleSubmit(e){
        setProtect(true)
        e.preventDefault()
        console.log(email,password)
        axios.post('https://blogapplication-2rkm.onrender.com/login',{
            email,password
        }).then(res => {console.log(res)
            
            if(res.data =='success'){
               window.localStorage.setItem('auth','ok')
               window.localStorage.setItem('loggedIn',true)
                setwrgmail('')
                setwrgpass('')
                navigate('/home')
                window.location.href='/home';
              
            }else if(res.data == 'user not exist'){
                    setwrgmail('no user found please register')
                    setwrgpass('')
            }else{
                setwrgmail('')
                setwrgpass('invalid password')
            }
            
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='login'>
        <div>
        <form className='loginForm' onSubmit={handleSubmit}>
            <input required autoFocus onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter your Email'/>
            <p className='reg_error'>{wrgmail}</p>
            <input required onChange={(e)=>setpass(e.target.value)}  type="text" placeholder='Enter your Password' />
            <p  className='reg_error'>{wrgpass}</p>
            <button type='submit'>LOGIN</button>
        </form>
        </div>
    </div>
  )
}

export default Login