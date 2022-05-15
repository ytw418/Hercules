import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { firebase_db } from "../firebaseConfig"
import { Route,Routes,NavLink  } from 'react-router-dom';



const PostBlock = styled.div`
   width: 100%;
   height: 100%;

   position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
   background: white;
   box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

   margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
   display: flex;
   flex-direction: column;
`;


const ProflieZone = styled.div`
display: flex;
padding: 10px 5px 10px 5px;
align-items: center;
position: relative;

`;
const ProflieImg = styled.img`
width: 35px;
height: 35px;
border-radius: 50%;
border: 2px #64bfed  solid;

`;
const ProflieName = styled.p`
margin:0px;
font-weight: bold;
padding-left: 10px;
font-size: 16px;
flex: 1;
`;

const ProfileEdit = styled.p`
margin: 0;
font-size: 16px;
padding-right: 10px;
font-weight:600;
&:hover {
   color: #339af0;
}

`;

const PostImg = styled.img`
width: 100%;
height: 300px;

`;

const PostText = styled.p`
   margin: 0px;
   padding: 20px;
   font-size: 15px;
   white-space:pre;

`;
const Postdate = styled.div`
font-size: 13px;

`

function Post() {
   const [posts, setPosts] = useState();
   //var posts = [];

   useEffect(() => {
      firebase_db.ref('posts').orderByChild('date').startAfter(1).once('value').then((snapshot) => {
         setPosts(snapshot.val());

      });
      
      
   }, []);



   return (
      
      <div>
         
         {posts && (
            Object.values(posts).reverse().map((posts) => (
               <PostBlock key={posts.postKey}>
                  
                  <NavLink to ={`/${posts.uid}`}style={({ isActive }) => ({  color: isActive ? 'black' : 'black' })}>
                  <ProflieZone>
                     <ProflieImg src={posts.userPhoto}></ProflieImg>
                     <ProflieName>{posts.userName}</ProflieName>
                     <Postdate >{posts.newDate}</Postdate>
                     </ProflieZone>
                     </NavLink>
                  
               
                  <PostImg src={posts.postPic} />
                  
                  <PostText >{posts.postContent}</PostText>
                  
                  

               </PostBlock>
            ))
         )}
      </div>
      
   );
};

export default React.memo(Post);

