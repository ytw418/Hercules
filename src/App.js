import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import About from './About';
import Home from './Home';

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
      </ul>
      <hr></hr>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;