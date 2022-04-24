import React,{useState,Component, useEffect} from 'react'
import styled from 'styled-components';
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import froflieimg from '../imgs/kawai.jpg'
import kagong1 from '../imgs/kagong1.jpg'
//const databaseURL = 'https://reactstagram-13fac-default-rtdb.firebaseio.com';
import {firebase_db} from "../firebaseConfig"
import PropTypes from 'prop-types';

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
   const [tip,setTip]=useState([]);
   useEffect(()=>{
      firebase_db.ref('/').once('value').then((snapshot) => {
         console.log("메인페이지 파이어베이스 조회 성공")
         setTip(snapshot.val());
      },[])
   },[]);
   
   return (
      <div>
      {tip.posts && (
         tip.posts.map((post,index)=>(
            <PostBlock key={index}>
               <PostText>{post.user_id}</PostText>
               <PostImg src={post.post_picture}/>
               <PostText key={index}>좋아요 {post.post_like}</PostText>
               <PostText>
                  {Object.keys(post.post_hashtag).map(function(v){
                     return(<div>#{v}</div>)
                  })}
                  {Object.keys(post.post_feed).map(function(v){
                     return(<div>{v} {post.post_feed[v]}</div>)
                  })}
               </PostText>
            </PostBlock>
         ))
      )}
      </div>
      
   )
}

export default React.memo(Post);