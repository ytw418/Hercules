import styled, { css } from 'styled-components';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import PageHeader from '../components/PageHeader'
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import useInputs from '../components/useInputs'
import { useTodoState, useUID } from '../ContextApi';
import { firebase_db } from "../firebaseConfig"



function ChatRoom() {
   console.log('리랜더링시작')
   const uid = useUID();
   const userState = useTodoState();
   const { state } = useLocation();
   const { roomId, roomTitle, roomUserlist, roomUserName } = state;
   const [{ text }, onChange, reset,] = useInputs({ text: '' });
   const [messageList, setMessageList] = useState(null);
   const scrollRef = useRef();

   //기본설정 변수
   const SPLIT_CHAR = '@spl@';
   const ONE_VS_ONE = 'ONE_VS_ONE';
   const MULTI = 'MULTI';

   useEffect(() => {
      loadMessageList(roomId)
      console.log('리랜더링:useEffect')
     
   
   }, [roomId])

  

   const loadMessageList = function (roomId) {
      console.log('리랜더링:loadMessageList 함수 ')
      let userdata = []
      if (roomId) {
         const messageRef = firebase_db.ref('Messages/' + roomId);
         messageRef.limitToLast(50).on('child_added', (data) => {
            let val = data.val();
            userdata = userdata.concat({
               key: data.key
               , profileImg: val.profileImg
               , userName: val.userName
               , time: val.timestamp
               , message: val.message
               , sendUid: val.uid
            })
            setMessageList(userdata);
            console.log('리랜더링:child_added ')
            
            
         });
      }
    
   }




   const saveMessages = function () {
      console.log('리랜더링:saveMessages')


      if (text.length > 0) {
         let multiUpdates = {};
         let messageRefKey = firebase_db.ref().child('Messgaes').push().key; // 메세지 키값 구하기



         if (messageList === null) { //메세지 처음 입력 하는 경우
            let roomUserlistLength = roomUserlist.length;
            for (let i = 0; i < roomUserlistLength; i++) {
               multiUpdates['RoomUsers/' + roomId + '/' + roomUserlist[i]] = true;
            }


         }


         //메세지  저장
         multiUpdates['Messages/' + roomId + '/' + messageRefKey] = {
            uid: uid,
            userName: userState.User[uid].Profile.Username,
            message: text, // 태그 입력 방지
            profileImg: userState.User[uid].Profile.Userphoto,
            timestamp: Date.now() //서버시간 등록하기
         }

         //유저별 룸리스트 저장
         let roomUserListLength = roomUserlist.length;
         if (roomUserlist && roomUserListLength > 0) {
            for (let i = 0; i < roomUserListLength; i++) {
               multiUpdates['UserRooms/' + roomUserlist[i] + '/' + roomId] = {
                  roomId: roomId,
                  roomUserName: roomUserName.join(SPLIT_CHAR),
                  roomUserlist: roomUserlist.join(SPLIT_CHAR),
                  roomType: roomUserListLength > 2 ? MULTI : ONE_VS_ONE,
                  roomOneVSOneTarget: roomUserListLength === 2 && i === 0 ? roomUserlist[1] :  // 1대 1 대화이고 i 값이 0 이면
                     roomUserListLength === 2 && i === 1 ? roomUserlist[0]   // 1대 1 대화 이고 i값이 1이면
                        : '', // 나머지
                  lastMessage: text,
                  profileImg: userState.User[uid].Profile.Userphoto,
                  timestamp: Date.now() //서버시간 등록하기

               };
            }
         }
         console.log(multiUpdates)
         firebase_db.ref().update(multiUpdates);
      }
      reset();
    
   }






   /**
    * timestamp를 날짜 시간 으로 변환
    */
   const timestampToTime = function (timestamp) {
      let date = new Date(timestamp),
         year = date.getFullYear(),
         month = date.getMonth() + 1,
         day = date.getDate(),
         hour = date.getHours(),
         minute = date.getMinutes(),
         week = new Array('일', '월', '화', '수', '목', '금', '토');

      let convertDate = year + "년 " + month + "월 " + day + "일 (" + week[date.getDay()] + ") ";
      let convertHour = "";
      if (hour < 12) {
         convertHour = "오전 " + pad(hour) + ":" + pad(minute);
      } else if (hour === 12) {
         convertHour = "오후 " + pad(hour) + ":" + pad(minute);
      } else {
         convertHour = "오후 " + pad(hour - 12) + ":" + pad(minute);
      }

      //convertDate
      return convertHour;
   }

   /**
    *  10미만 숫자 앞에 0 붙이기
    */
   const pad = function (n) {
      return n > 9 ? "" + n : "0" + n;
   }


   const onEnterKey = function (e) {
      if (e.key === 'Enter') {
         //엔터키 키코드가 입력이 되면 
         e.preventDefault(); saveMessages();
      }
   }

   scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
   return (
      <>
         <PageHeader  title={roomTitle} checkstyle={{ display: 'none' }} ></PageHeader>
         <ChatRoomListContainer  ref={scrollRef} >
            <div className='chatRoomListBlock'>
               {messageList &&
                  Object.values(messageList).map((msg) => (
                     msg.sendUid === uid ?
                        <NavLink key={msg.key} to={`/${msg.sendUid}`} style={{ color: '#000' }}>
                           <div className='chatRoom'>
                              <ProflieZone reverse={false}>
                                 <ProflieImg src={msg.profileImg}></ProflieImg>
                                 <div>
                                    <Message>{msg.message}</Message>
                                 </div>
                                 <span>{timestampToTime(msg.time)}</span>
                              </ProflieZone>
                           </div>
                        </NavLink> :
                        <NavLink    key={msg.key} to={`/${uid}`} style={{ color: '#000' }}>
                           <div className='chatRoom'>
                              <ProflieZone reverse={true}>
                                 <ProflieImg src={msg.profileImg}></ProflieImg>
                                 <div>
                                    <ProflieName>{msg.userName}</ProflieName>
                                    <Message>{msg.message}</Message>
                                 </div>
                                <span>{timestampToTime(msg.time)}</span>
                              </ProflieZone>
                           </div>
                        </NavLink> 
                  ))
               }
            </div>
            <InputComment >
               <input autoFocus onKeyPress={onEnterKey}
                  placeholder={` ${userState.User[uid].Profile.Username} (으)로 메시지 전송 ...`}
                  name='text' onChange={onChange} value={text}></input>
               <button onClick={saveMessages}>전송</button>
            </InputComment>
         </ChatRoomListContainer>
      </>
   )
}


const ChatRoomListContainer = styled.div`
padding-top: 65px;
`
const ProflieZone = styled.div`
display: flex;
padding: 10px 5px 10px 5px;
align-items: center;
position: relative;
flex-direction: ${props => props.reverse ? 'row' : 'row-reverse'};
div{
padding-left: 5px;
padding-right: 5px;
font-weight: 500;
font-size: 14px;
//text-align: ${props => props.reverse ? 'right' : 'none'};
}
span{
   font-size:13px;
   color: #656565;
   }
`;
const ProflieImg = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;

`;
const Message = styled.p`
   background: #eaeaeaf2;
   padding: 8px;
   border-radius: 18px;
`;

const ProflieName = styled.p`
margin:0px;
font-size: 13px;
font-weight: 600;
`;

const InputComment = styled.div`
width: 100%;
    position: fixed;
    text-align: center;
    bottom: 0;
    /* margin: 0 0 10px 0; */
    /* padding: 8px 8px; */
    height: 50px;
    font-size: 15px;
    font-weight: 500;
    border-top: 0.5px #acacac solid;
    display: flex;
    background: #fff;
   input{
      border:none;
      flex: 1;
   }
   button{
   background: #fff;
   border: none;
   color: #6683fe;
   font-weight: bold;
   font-size: 15px;
   }
`;


export default React.memo(ChatRoom);