import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';


const Home = () => {

  const [postData,setPostData] = useState([]);
  // const homePage = norev?null:reverse()
//  const isLogged = (localStorage.getItem('loggedIn'));

  useEffect(()=>{

    axios.get('https://blogapplication-2rkm.onrender.com/getPost')
    .then(post => {setPostData(post.data.reverse())
        // console.log(postData);
    })
    .catch(err => {

      setInterval(()=>{
       window.location.reload()
   },3000)

    });
  },[])

  
  return (
    <div> <TopNavBar/>
    <div className='home'  > 
    <div className='innerPost'>

        {/* <div className='statusBar'>
            {
              postData.map((a,i)=>
               <div className='status' key={i}>
                  <img className='statusicon' src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png" alt="" />
                  <li className='statusName'>{a.name}</li>
                  </div>
               )
            }
        </div> */}
          {
            postData.map((a,i)=>
          <div key={i}>
           
            <Link to={`/post/${a._id}`} >
              <ul className='perPost' >
                <div className='icontab'>
                      <img className='usericon' src={a.profile?"https://blogapplication-2rkm.onrender.com/images/"+a.profile:"https://cdn-icons-png.flaticon.com/128/3237/3237472.png"} alt="" />
                      <li className='desName'>{a.name}</li>
                </div>
                <img className='postImage' src={"https://blogapplication-2rkm.onrender.com/images/"+a.file} alt="" />
                <div className='icons'>
                <span className="material-symbols-outlined">
                  favorite
                  </span>
                  <span className="material-symbols-outlined">
                  mode_comment
                  </span>
                  <span className="material-symbols-outlined send">
                  send
                  </span>
                </div>
                <li className='postTitle'>{a.title}</li>
                <li className='des'><span className='desName'>{a.name}</span>{a.description}</li>
                <li className='date'>{a.time.slice(3,15)}</li>
              </ul>
            </Link>
            </div>
            )}
          </div>
     
    </div>
    </div>
  )
}

export default Home