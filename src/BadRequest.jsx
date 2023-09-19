import React, { useState } from 'react'

const BadRequest = () => {
    const [show,setShow] = useState(false)
    setTimeout(()=>{

         setShow(true)
        console.log('lll');

    },2000)
  return (
    <div>
        {show?
           <div>BadRequest
           <h1 style={{color:'red'}}>Bad Request</h1>
           <h1 style={{color:'blue'}}>404 Page not found</h1>
       </div>:null}
            
    </div>
  )
}

export default BadRequest