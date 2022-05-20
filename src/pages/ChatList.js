import styled, { css } from 'styled-components';
import React from 'react'
import PageHeader from '../components/PageHeader'
import { useNavigate,NavLink } from 'react-router-dom';

function ChatList() {
   return (
      <>
         <PageHeader title={'채팅'} ></PageHeader>
         <ChatRoomListContainer>
            <div className='chatRoomListBlock'>
            <NavLink to={`/ChatRoom/asd`} style={{color:'#000'}}>
               <div className='chatRoom'>
                  <ProflieZone>
                     <ProflieImg src="https://t1.daumcdn.net/cfile/tistory/2438573358070C1535"></ProflieImg>
                     <div>
                        <ProflieName>이름</ProflieName>
                        <p>마지막 채팅 내용</p>
                     </div>
                     <span>오후 7시50분</span>
                  </ProflieZone>
               </div>
               </NavLink>
            </div>
         </ChatRoomListContainer>
      </>
   )
}


const ChatRoomListContainer = styled.div`

`
const ProflieZone = styled.div`
display: flex;
padding: 10px 5px 10px 5px;
align-items: center;
position: relative;
div{
padding-left: 15px;
font-weight: bold;
font-size: 14px;
flex: 1;
}
span{
   font-size:13px;
   color: #656565;
   }
`;
const ProflieImg = styled.img`
width: 55px;
height: 55px;
border-radius: 50%;

`;
const ProflieName = styled.p`
margin:0px;
flex: 1;
font-size: 16px;
`;

export default ChatList