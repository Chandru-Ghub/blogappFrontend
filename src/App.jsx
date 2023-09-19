import { createContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Login from './Login'
import Register from './Register'
import NavBar from '../NavBar'
import CreatePost from './CreatePost'
import axios from 'axios'
import Panel from './Panel'
import Post from './Post'
import EditPost from './EditPost'
import TopNavBar from './TopNavBar'
import Profile from './Profile'
import BadRequest from './BadRequest'

export const userContext = createContext()


function App() {

  const [check, setCheck] = useState({})
  const[protect,setProtect] = useState(false)
  axios.defaults.withCredentials = true;
 
  useEffect(()=>{

    axios.get('https://blogapplication-2rkm.onrender.com/home')
    .then(res=> {setCheck(res.data)})
    .catch(err=>console.log(err))
  },[])

  let k = localStorage.getItem('auth')
  const isLoggedIn = window.localStorage.getItem('loggedIn')
  // console.log(k);
  // let l = document.cookie
  // console.log(l);
  return (
    <>
    <userContext.Provider value={check}>
      <BrowserRouter>
          {/* <TopNavBar/> */}
          <NavBar/>
          
          <Routes>
                
                <Route path='/' Component={isLoggedIn == 'true'?Home:Panel}></Route>
                <Route path='/home' Component={k?Home:BadRequest}></Route>
                <Route path='/contact' Component={k?Contact:BadRequest} ></Route>
                <Route path='/create' Component={k?CreatePost:BadRequest} ></Route>
                <Route path='/login' element={k!='ok' ? <Login setProtect = {setProtect}/>: <Home/>}></Route>
                <Route path='/register' Component={k!=='ok'?Register:Home}></Route>
                <Route path='/post/:id' Component={k?Post:BadRequest}></Route>
                <Route path='/editPost/:id' Component={EditPost}></Route>
                <Route path='/profile' Component={k?Profile:BadRequest}></Route>
          </Routes>
      </BrowserRouter>
         
    </userContext.Provider>
    </>
   
  )
}

export default App
