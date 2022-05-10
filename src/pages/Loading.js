
import React, { useState, useEffect } from 'react';
import { authService} from '../firebaseConfig';
import { useSetUID, useTodoDispatch } from '../ContextApi';
import { firebase_db } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


function Loading() {

   const setuid = useSetUID();
   const dispatch = useTodoDispatch();
   const navigate = useNavigate();

   console.log('로딩');
      // 페이지 마운트시 로그인 검사
      useEffect(() => {
         authService.onAuthStateChanged( async(user) => {
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
               navigate('/Home');
            
            } else {
               navigate('/Login');
               console.log("user is signed out")
            }
         });
      },[]);
   






   return (
      <div>Loading...</div>
   )
}

export default Loading