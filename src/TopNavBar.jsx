import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from './App'


const TopNavBar = () => {
    const check = useContext(userContext)
    const [dp,setDp] = useState([])
    const navigate = useNavigate()
  

    useEffect(()=>{
      // console.log('working');
      axios.get('https://blogapplication-2rkm.onrender.com/myprofile/'+check.email)
      .then(profile => {setDp(profile.data.reverse()[0].file)
      
      },[])
      .catch(err =>
        console.log(err))
    })
    function handleLogout(){
        console.log('done');
        axios.get('https://blogapplication-2rkm.onrender.com/logout')
        .then(result => {

                if(result.data =='success'){
                    // console.log('ok');
                    // window. location. reload();
                    if(window.confirm('You want to logOut')){
                      window.localStorage.clear()
                      // document.cookie.clear()
                      window.location.href = '/'
                    }
                    
                   
                    // navigate('/create')
                    
                }
        
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='navtop'>
      <img className='inslogo' src="https://logodix.com/logo/836891.png" alt="" /> 
        <div className='navTopinner'>

            {
                check.name?
                <div className='settings'>
                  <NavLink
                                to="/profile"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : "normal"
                                }
                                >
                                    <span className="material-symbols-outlined profile">
                  account_circle
                  </span>
                               
                        </NavLink>
                
                
                <span title='logout' onClick={handleLogout} className="material-symbols-outlined logout">
                            logout
                            </span>
                      
                          <div className='online'>
                           {dp.length!=0?<img title='myProfile' onClick={()=>navigate('/profile')} className='navdp'  src={'https://blogapplication-2rkm.onrender.com/images/'+dp} alt="dp" />:
                              <img title='myProfile' onClick={()=>navigate('/profile')} className='navdp'  src= "https://cdn-icons-png.flaticon.com/128/3237/3237472.png"  alt="dp" />
                           }
                            <p className='dot'></p>
                            </div>

                
                </div>

                :
                <div>

                    
                        <NavLink
                                to="/register"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : "normal"
                                }
                                >
                                Register
                        </NavLink>
                        <NavLink
                                to="/login"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : "normal"
                                }
                                >
                                login
                        </NavLink>
                </div>
            }



            {/* <h3>Register</h3>
            <h3>Login</h3> */}
        </div>
    </div>
  )
}

export default TopNavBar