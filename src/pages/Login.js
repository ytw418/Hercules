
import React, { useState,useEffect } from 'react';
import { authService, firebaseInstance } from '../firebaseConfig';
import { useSetUID, useTodoDispatch } from '../ContextApi';
import { firebase_db } from "../firebaseConfig";
import {useNavigate } from 'react-router-dom';


function Login({ setReady, ready }) {
   const navigate = useNavigate();
   const setuid = useSetUID();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [newAccount, setNewAccount] = useState(true);
   const dispatch = useTodoDispatch();
   const [loading ,setLoading] = useState(true);

   // 페이지 마운트시 로그인 검사
   useEffect(() => {
      authService.onAuthStateChanged((user) => {
      if (user) {
      firebase_db.ref(`/users/${user.uid}/`).once('value').then((snapshot) => {
            console.log("로그인회원 파이어베이스 유저데이터 조회 성공")
            dispatch({
               type: 'LOGIN_USER',
               user: snapshot.val(),
            })
         });
         setuid(user.uid);
         console.log("user is signed in:" + user.uid)
         navigate('/Home');
         
      
   } else {
      setLoading(!loading)
         console.log("user is signed out")
   }
   });
}, []);



   // 로그인시 이벤트 
   const onChange = (event) => {
      const { target: { name, value } } = event;
      if (name === 'email') { setEmail(value) }
      else if (name === "password") { setPassword(value); }
   }

   const onSubmit = async (event) => {
      event.preventDefault();
      try {
         let data;
         if (newAccount) {
            /// 새로운 유저 생성 
            data = await authService.createUserWithEmailAndPassword(email, password);
            const uid = data.user._delegate.uid;

            firebase_db.ref(`/users/${uid}/`).set({
               Profile: {
                  Uid: `${uid}`,
                  Username: `이름없음`,
                  Userphoto: 'https://file.namu.moe/file/105db7e730e1402c09dcf2b281232df07cfd8577675ab05e4c269defaefb6f38c54eade7a465fd0b0044aba440e0b6b77c4e742599da767de499eaac22df3317',
                  Introduce: '소개없음',
               },
               UserPost: {

               },
            });
            alert("회원가입 성공");


         } else { // 회원가입 한 유저가 로그인시 이벤트
            data = await authService.signInWithEmailAndPassword(email, password);

            setuid(data.user._delegate.uid);

            firebase_db.ref(`/users/${data.user._delegate.uid}/`).once('value').then((snapshot) => {
               console.log("로그인회원 파이어베이스 조회 성공")
               dispatch({
                  type: 'LOGIN_USER',
                  user: snapshot.val(),
               })
            });
            navigate('/Home');

         }
      } catch (error) {
         console.log(error)
      }
   }


   // const onSubmit = async (event) => {
   //    event.preventDefault();
   //    try {
   //       let data; 
   //       if (newAccount) {
   //          / 새로운 유저 생성 
   //          data = await authService.createUserWithEmailAndPassword(email, password);
   //       } else { // 회원가입 한 유저가 로그인시 이벤트
   //          data = await authService.signInWithEmailAndPassword(email, password);
   //       } console.log(data);
   //    } catch (error) {
   //       console.log(error)
   //    }
   // }

   const toggleAccount = () => setNewAccount((prev) => !prev);


   const onGoggleClick = async (event) => {
      const { target: { name } } = event;
      let provider;
      if (name === 'google') {
         provider = new firebaseInstance.auth.GoogleAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
      console.log(data);
   }



   return ( loading ? <Loading/> : (
      <>
         <div>
            <form onSubmit={onSubmit}>
               <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
               <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
               {/* 로그인 했다 ?? 하면 회원가입 유저와 기존 유저가 로그인할때를 구분해줌 */}
               <input type="submit" value={newAccount ? "Create Account" : "Login"} />
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Login" : "Craete Account"}</span>
         </div>
         
         <button onClick={onGoggleClick} name='google'>구글로그인</button>

      </>));


}
export default Login;


export function Loading() {


   return (
      <div>Loading...</div>
   )
}

