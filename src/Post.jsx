import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from './App';



const Post = () => {

    const perdata = useContext(userContext);
    const commentPerson = perdata.name
    // comment functionality
    const [comment,setComment] = useState();
    const [showComment,setShowComment] = useState([])
    const [showPost,setShowPost] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
    axios.get('https://blogapplication-2rkm.onrender.com/getpostbyid/'+id)
    .then(post => {setShowPost(post.data)
    })
    .catch(err => console.log(err))
            
        },[])

    useEffect(()=>{
    axios.get('https://blogapplication-2rkm.onrender.com/getcommentbyid/'+id)
    .then(post => {
        // console.log(post)
        setShowComment(post.data)
    })
    .catch(err => console.log(err))
            
        },[])

    function deletePost(){
        axios.delete('https://blogapplication-2rkm.onrender.com/deletebyid/'+id)
        .then(delPost =>{
            console.log(delPost);
            navigate('/home')
        })
        .catch(err => console.log(err))
    }

    function deleteComment(cmtid){
        const ID = cmtid
        console.log(ID);
        axios.delete('https://blogapplication-2rkm.onrender.com/deletecomment/'+ID)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    // function editPost(){
    //     axios.put('http://localhost:4600/deletebyid/'+id)
    //     .then(editPost =>{
    //         console.log(editPost);
    //         // navigate('/home')
    //     })
    //     .catch(err => console.log(err))
    // }

    function addComment(e){
        e.preventDefault();
        console.log(comment,id,commentPerson);
        axios.post('https://blogapplication-2rkm.onrender.com/comments',{comment,id,commentPerson})
        .then((result)=>console.log(result))
        .catch(err=>console.log(err))

    }
  return (
    <div>Post

        <div className='perPost'>
            <ul>
                <li>{showPost.title}</li>
                <img className='postImage' src={"https://blogapplication-2rkm.onrender.com/images/"+showPost.file} alt="image" />
                <li>{id}</li>
                <li>{showPost.description}</li>

                {/* Display comment section only to other users */}
                { perdata.email !== showPost.email ?
                <form onSubmit={addComment}>
                    <textarea name="comments" id="comments" cols="30" rows="10" onChange={(e)=>setComment(e.target.value)}></textarea>
                    <button type='submit'>Add comment</button>
                </form>:null
                }


                {
                    perdata.email == showPost.email ?
                    <>
                     <Link to={`/editPost/${id}`}>
                        <button>Edit Post</button>
                </Link>
                <button onClick={deletePost}>Remove Post</button>
                    </>
                    :null
                }
               
            </ul>
            <div>
                {/* {console.log(showComment)} */}
                {showComment.length?showComment.map((cmt)=>
                <div>
                    <div>
                    <p>{cmt.comment}</p>
                    <p>{cmt.commentPerson}</p>
                    </div>
                {
                    perdata.email == showPost.email ?
                    <button onClick={()=>deleteComment(cmt._id)}>DeleteCMT</button>:null}
                </div>
                ):<p>No comments yet</p>}
            </div>
        </div>
    </div>
  )
}

export default Post