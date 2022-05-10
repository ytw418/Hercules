import React, { useEffect } from 'react';
import Post from '../components/Post';
import BottomTeb from '../components/BottomTeb';
import Header from '../components/Header';

import { authService } from '../firebaseConfig';
import { useSetUID, useTodoDispatch } from '../ContextApi';
import { firebase_db } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const setuid = useSetUID();
  const dispatch = useTodoDispatch();
  const navigate = useNavigate();

  // 페이지 마운트시 로그인 검사
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        await firebase_db.ref(`/users/${user.uid}/`).once('value').then((snapshot) => {
          console.log("로그인 검사 로그인회원 파이어베이스 유저데이터 조회 성공")
          dispatch({
            type: 'LOGIN_USER',
            user: snapshot.val(),
          })
        });
        setuid(user.uid);
        console.log("user is signed in:" + user.uid)

      } else {
        navigate('/Login');
        console.log("user is signed out")
      }
    });
  }, []);



  return (
    <>
      <Header></Header>
      <Post></Post>
      <BottomTeb></BottomTeb>
    </>

  );
};

export default React.memo(Home);