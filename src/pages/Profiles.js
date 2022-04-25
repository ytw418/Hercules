import React, { useState } from 'react';
import { Route,Routes,NavLink  } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample'
import { useData } from '../ContextApi';
import axios from "axios"
import {firebase_db} from "../firebaseConfig"
import { useEffect } from 'react';

const Profiles = () => {
  const userdata = useData();
  console.log(userdata);
  const [state,setState] = useState('asdasd');

  useEffect(()=>{
        firebase_db.ref('/posts/').once('value').then((snapshot) => {
          console.log("메인페이지 파이어베이스 조회 성공")
          let tip = snapshot.val();
          console.log(tip);
          setState(tip);
          
        
  },[])
},[]);

console.log(state[0].id);


  return (
    <div>
      <h3>{state[0].id}</h3>
      <ul>
        <li>
          <NavLink to="/profiles/velopert" style={({ isActive }) => ({ color: isActive ? 'black' : 'white' })}>velopert</NavLink>
        </li>
        <li>
          <NavLink to="/profiles/gildong" className={({ isActive }) => 'nav-link' + (isActive ? ' activated' : '')}>gildong</NavLink>
        </li>
      </ul>
      <Routes>
  <Route path='/' element='유저를 선택해주세요' />
  <Route path='/:username' element={<Profile/>} />
</Routes>
<WithRouterSample />
    </div>
    
  );
};

export default Profiles;