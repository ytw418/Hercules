import React, { useEffect, useState } from 'react';
import {firebase_db} from "../firebaseConfig"

function Upload(){
    const [tip,setTip]=useState()

    const [feed,setfeed]=useState()
    const [hashtag,setHashtag]=useState()
    const [post_id,setPostid]=useState()
    const [picture,setPicture]=useState()
    const [user_id,setUserid]=useState()
    
    useEffect(()=>{
        setTip(firebase_db.ref('/posts/7').set({post_feed:{"user1":""},post_hashtag:{"굳":""},post_id:7,post_picture:"1234.jpg",user_id:"g@mail.com"}))
     },[]);
     console.log(tip)
    return(<div>upload</div>)
}

export default Upload;