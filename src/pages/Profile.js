import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import { firebase_db } from "../firebaseConfig.js";
import BottomTeb from '../components/BottomTeb'
import styled from 'styled-components';
import MyPost from '../components/MyPost';
import Header from '../components/Header';
import { useTodoState,useUID} from '../ContextApi';

const ProfileZone = styled.div`
width: 100%;
height: 100px;
display: flex;
align-items: center;
`;
const UserImg = styled.img`
width: 100px;
height: 100px;
border-radius: 50%;
padding: 10px;

`;
const UserZoen = styled.div`
padding: 10px;
strong{font-size:20px;}
div{
  color: #000;
}
.asd{color:#000;}
`;


const UserDataSec = styled.div`
display: flex;
`
const UserDataBlock = styled.p`
margin: 10px;
font-weight: bold;

`;
const ProfileBtn = styled.button`
margin: 5px;
background-color: #fff;
border: #aaa 1px solid;
`

const Profile = () => {

  // 파라미터를 받아올 땐 match 안에 들어있는 params 값을 참조합니다.
  const uid = useUID();
  const { targetUid } = useParams();
  const [user, setUser] = useState()
  const navigate = useNavigate();
  const state = useTodoState();
  console.log('targetUid :>> ', targetUid);
  useEffect(() => {
    const userCheck = async () => {
        firebase_db.ref(`/users/${targetUid}/`).on('value', (snapshot) => {
        console.log("로그인 검사 로그인회원 파이어베이스 유저데이터 조회 성공")
        setUser(snapshot.val())
        console.log('snapshot.val() :>> ', snapshot.val());
        
      });
    }

    userCheck()

  }, [])

  

  const onUserListClick = async() => {
  
    
    const MAKEID_CHAR = '@make@';
    const DATETIME_CHAR = '@time@';
    const targetUserUid = user.Profile.Uid;
    const targetUserName = user.Profile.Username;
    const roomTitle = targetUserName + '님';
    const roomUserlist = [targetUserUid, uid]; // 챗방 유저리스트
    const roomUserName = [targetUserName, state.User[uid].Profile.Username] // 챗방 유저 이름
    
    const UserRoomsRef = firebase_db.ref('UserRooms/'+ uid).orderByChild('roomOneVSOneTarget').equalTo(targetUserUid)
    await UserRoomsRef.once('value').then((snapshot)=>{
       const val = snapshot.val();
       //console.log(snapshot.val().roomId)
       console.log(val)
       if(val === null){
          const roomId =  MAKEID_CHAR + uid + DATETIME_CHAR + yyyyMMddHHmmsss();
        navigate('/ChatRoom',{ state: {roomId,roomTitle,roomUserlist,roomUserName}})
         console.log('신규방'+roomId)
       }else{
          const roomId =  Object.values(val)[0].roomId;
         navigate('/ChatRoom',{ state: {roomId,roomTitle,roomUserlist,roomUserName}})
         console.log('기존방'+roomId)
       }

    })
 }

 
   /**
    * 현재날짜 yyyyMMddHHmmsss형태로 반환
    */
    const yyyyMMddHHmmsss = function () {
      let vDate = new Date();
      let yyyy = vDate.getFullYear().toString();
      let MM = (vDate.getMonth() + 1).toString();
      let dd = vDate.getDate().toString();
      let HH = vDate.getHours().toString();
      let mm = vDate.getMinutes().toString();

      let ss = vDate.getSeconds().toString();
      let sss = vDate.getMilliseconds().toString();
      return yyyy + (MM[1] ? MM : '0' + MM[0]) + (dd[1] ? dd : '0' + dd[0]) + (HH[1] ? HH : '0' + HH[0])
         + (mm[1] ? mm : '0' + mm[0]) + (ss[1] ? ss : '0' + ss[0]) + sss;
   };




  return (user &&
  <>
  <Header></Header>
    <ProfileZone>
      <UserImg src={user.Profile.Userphoto} />
      <UserDataSec>
        <UserDataBlock>게시물 0</UserDataBlock>
        <UserDataBlock>팔로워 0</UserDataBlock>
        <UserDataBlock>팔로잉 0</UserDataBlock>
      </UserDataSec>
    </ProfileZone>
    <UserZoen>
      <strong>{user.Profile.Username}</strong>
      <div style={{whiteSpace:'pre'}}>{user.Profile.Introduce}</div>
    </UserZoen>
    <ProfileBtn onClick={()=> onUserListClick(user)}>메시지 보내기</ProfileBtn>
    
    <MyPost posts={user.UserPost} profile={user.Profile}></MyPost>
    <BottomTeb></BottomTeb>
  </>
  //  <button onClick={() => navigate('/')}>홈으로</button>
);
};


export default Profile;