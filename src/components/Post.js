import React from 'react'
import styled from 'styled-components';
import froflieimg from '../imgs/kawai.jpg'
import kagong1 from '../imgs/kagong1.jpg'

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
   return (
      <PostBlock>
         <FroflieZone>
         <FroflieImg src={froflieimg}></FroflieImg>
         <FroflieName>테리어몬</FroflieName>
         </FroflieZone>
         <PostImg src={kagong1}></PostImg>
         <PostText>좋아요 100개</PostText>
         <PostText>#카공 #리액트</PostText>
         <PostText>리액트 공부 재밌다</PostText>
      </PostBlock>
   )
}

export default React.memo(Post);