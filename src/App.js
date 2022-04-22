import React from 'react';
import { Routes, Route, Link,useLocation } from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import HistorySample from './pages/HistorySample';
import BottomTeb from './components/BottomTeb'
import Header from './components/Header';
import MainBlock from './components/MainBlock';

const App = () => {
  const { pathname } = useLocation(); // 추가
  return (
    <>
    <MainBlock>
    <Header></Header>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Profiles/*"  element={<Profiles />} />
        <Route path="/HistorySample"  element={<HistorySample />} />
        <Route path='/*' element={ <h1>이 페이지는 존재하지 않습니다. - {pathname}</h1> }/>
      </Routes>
    <BottomTeb></BottomTeb>
    </MainBlock>
    </>
  );
};

export default App;