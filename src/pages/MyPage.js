import React from 'react';
//버전 v6 
//withRouter, useRouteMatch, match, 사라짐
//기존 history의 모든 기능은 useNavigate로 통합되었다
// match 는 useParams 로 변경
import { useParams, useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import userimg from '../imgs/kawai.jpg';
import {useTodoState,useTodoDispatch,useUID} from '../ContextApi';

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
width: 100%;
background-color: #fff;
`

const MyPage = () => {

   const params = useParams();
   const location = useLocation();
   const navigate = useNavigate();
   const state = useTodoState();
   const uid = useUID();

   const goProfileEdit = () => {
    navigate('/ProfileEdit');
  }

  return (
    <>
    <ProfileZone>
      <UserImg src={state.User[uid].Userphoto} />
        <UserDataSec>
          <UserDataBlock>게시물 0</UserDataBlock>
          <UserDataBlock>팔로워 0</UserDataBlock>
          <UserDataBlock>팔로잉 0</UserDataBlock>
        </UserDataSec>
    </ProfileZone>
    <UserZoen>
      <strong>{state.User[uid].Username}</strong>
      <div>{state.User[uid].Introduce}</div>
   
    </UserZoen>
    <ProfileBtn onClick={goProfileEdit}>프로필 편집</ProfileBtn>
    </>
    //  <button onClick={() => navigate('/')}>홈으로</button>
  );
};

export default MyPage;