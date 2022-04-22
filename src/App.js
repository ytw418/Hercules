import React from 'react';
import { Routes, Route, Link,useLocation } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import HistorySample from './pages/HistorySample';

const App = () => {
  const { pathname } = useLocation(); // 추가
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/Profiles">프로필</Link>
        </li>
        <li>
          <Link to="/HistorySample">HistorySample</Link>
        </li>
      </ul>
      <hr></hr>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Profiles/*"  element={<Profiles />} />
        <Route path="/HistorySample"  element={<HistorySample />} />
        <Route path='/*' element={ <h1>이 페이지는 존재하지 않습니다. - {pathname}</h1> }/>
      </Routes>
    </div>
  );
};

export default App;