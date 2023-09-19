import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email,setEmail] = useState();
    const [password,setpassword] = useState();
    const [name , setName] = useState();
    const [erro ,setErro]  =useState();
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        console.log(name,email,password)
        axios.post('https://blogapplication-2rkm.onrender.com/register',{
            name,email,password
        }).then(res =>{
            console.log(res)
            setErro('')
            if(res.data == 'Email already existed use another mail ID '){
                setErro(res.data)
            }else{
                setErro('')
                setTimeout(()=>{
                    alert('Registred sucessfully')
                    navigate('/login')
                },1000)
              
            }
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='register'>
        <div>
        <form className='loginForm' onSubmit={handleSubmit}>
            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter your Name'/>
            <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter your Email'/>
            <p className='reg_error'>{erro}</p>
            <input  onChange={(e)=>setpassword(e.target.value)}  type="text" placeholder='Enter your Password' />
            <button type='submit'>REGISTER</button>
            <div style={{textAlign:'center'}}>
            <Link to='/login'>login?</Link>
            </div>

        </form>
        </div>
    </div>
  )
}

export default Register