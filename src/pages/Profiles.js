import React from 'react';
import { Route,Routes,NavLink  } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample'

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
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