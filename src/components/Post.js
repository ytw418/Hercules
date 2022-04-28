import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { firebase_db } from "../firebaseConfig"


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


const FroflieZone = styled.div`
display: flex;
padding: 5px;
align-items: center;
`;
const FroflieImg = styled.img`
width: 30px;
height: 30px;
`;
const FroflieName = styled.p`
margin:0px;
`;

const PostImg = styled.img`
width: 100%;
height: 300px;
`;

const PostText = styled.p`
margin:0px;
padding: 5px;
`;
function Post() {
   const [posts, setPosts] = useState({      
   });

   useEffect(() => {
      firebase_db.ref('/posts/').once('value').then((snapshot) => {
         setPosts(snapshot.val());
      })
   }, []);

   console.log(posts)
   
   return (
      <div>
          
         {posts && (
            Object.values(posts).map((posts) => (
               <PostBlock key={posts.postKey}>
                  <PostText>{posts.userName}</PostText>
                  <PostImg src={posts.postPic}/>
                  <PostText>{posts.postContent}</PostText>
               </PostBlock>
            ))
         )}
      </div>
   );
};

export default React.memo(Post);

