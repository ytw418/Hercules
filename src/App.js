import React from 'react';
import { Routes, Route, Link,useParams } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () => {
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
          <Link to="/Profiles/gildong">프로필</Link>
        </li>
      </ul>
      <hr></hr>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Profiles/:username"  element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;