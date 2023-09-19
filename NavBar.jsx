import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from './src/App'
import axios from 'axios'


const NavBar = () => {

    const check = useContext(userContext)
    
    const navigate = useNavigate()
        // check=='Wrong Token'? navigate('/'):null
    function handleLogout(){
        console.log('done');
        axios.get('https://blogapplication-2rkm.onrender.com/logout')
        .then(result => {

                if(result.data =='success'){
                    // console.log('ok');
                    // window. location. reload();
                    window.location.href = '/'
                    // navigate('/create')
                    
                }
        
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='nav'>
        <ul className='navLinks'>
            {
                check.name?
            <NavLink
                to="/home"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "normal"
                }
                title='Home Page'
                >
               <span className="material-symbols-outlined i">
                    home
                </span>
        </NavLink>
            :null
             }

        {
            check.name?
        <NavLink
                to="/contact"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "normal"
                }
                title='Followers'
                >
                <span className="material-symbols-outlined i">
                    group
</span>
        </NavLink>
        :null
        }


        {
            check.name?
        <NavLink
                to="/create"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : "normal"
                }
                title='Upload new post'
                >
               <span className="material-symbols-outlined i">
                upload
                </span>
        </NavLink>
        :null
        }


        </ul>
      
    </div>
  )
}

export default NavBar