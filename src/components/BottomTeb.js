import React from 'react'
import styled, { css } from 'styled-components';
import {MdSearch,MdHome,MdAccountCircle,MdShoppingCart} from 'react-icons/md';
import {NavLink } from "react-router-dom";


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

   return (
      <>
      <BottomTebBlock>
         <Text><NavLink to="/Home" style={({ isActive }) => ({ color: isActive ? '#e03c8f' : 'black' })}><MdHome></MdHome></NavLink></Text>
         <Text><NavLink to="/about" style={({ isActive }) => ({ color: isActive ? '#e03c8f' : 'black' })}><MdSearch></MdSearch></NavLink></Text>
         <Text><NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#e03c8f' : 'black' })}><MdShoppingCart/></NavLink></Text>
         <Text><NavLink to="/MyPage" style={({ isActive }) => ({ color: isActive ? '#e03c8f' : 'black' })}><MdAccountCircle/></NavLink></Text>
      </BottomTebBlock>
         </>
   )
}

export default React.memo(BottomTeb);