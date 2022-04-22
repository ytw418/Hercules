import React,{memo} from 'react'
import styled, { css } from 'styled-components';
import {MdSearch,MdHome,MdAccountCircle,MdShoppingCart} from 'react-icons/md';
import { Routes, Route, Link,useLocation } from "react-router-dom";


import About from '../pages/About';
import Home from '../pages/Home';
import Profiles from '../pages/Profiles';
import HistorySample from '../pages/HistorySample'

const BottomTebBlock =  styled.div`
display:flex;
background:#fff;
width: 100%;
height: 56px;
position: fixed;
bottom:0px;
border-top: 1px #0000002e solid;

`;

const Text = styled.div`
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
flex: 1;
font-size:25px;
&:hover{
   color:#e03c8f;
}
color:#000;
   ${props =>
      props.done &&
      css
         `color:#ced4da;
         `}
`;


function BottomTeb() {
   console.log("BottomTeb 랜더링")
   return (
      <>
      <BottomTebBlock>
         <Text><Link to="/"><MdHome></MdHome></Link></Text>
         <Text><Link to="/about"><MdSearch></MdSearch></Link></Text>
         <Text><Link to="/Profiles"><MdShoppingCart/></Link></Text>
         <Text><Link to="/HistorySample"><MdAccountCircle/></Link></Text>
      </BottomTebBlock>
          </>
   )
}

export default React.memo(BottomTeb);