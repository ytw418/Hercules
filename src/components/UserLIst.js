import { async } from '@firebase/util';
import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import { firebase_db } from "../firebaseConfig"

function UserLIst() {

   const [userList,setUserList] = useState([]);
   
   useEffect(() => {
      const getUserList = async() =>{
         let userdata = []
         const userRef = firebase_db.ref('users')
         userRef.on('child_added', (data) => {
         userdata = userdata.concat(data.val().Profile)
         setUserList(userdata)
         console.log(userList)
         })
      }
      getUserList()
   }, []);
   console.log(userList)







   return (
   

      userList && <UserLIstContainer>
      <div><h1>UserList</h1></div>
      {userList.map((user) =>(
      <ProflieZone key={user.uid}>
      <ProflieImg src={user.Userphoto}></ProflieImg>
      <ProflieName>{user.Username}</ProflieName>
      </ProflieZone>
      ))}
      

      </UserLIstContainer>
   )
}

const UserLIstContainer =styled.div`

`;
const ProflieZone = styled.div`
display: flex;
padding: 10px 5px 10px 5px;
align-items: center;
position: relative;
`;
const ProflieImg = styled.img`
width: 35px;
height: 35px;
border-radius: 50%;
`;
const ProflieName = styled.p`
margin:0px;
font-weight: bold;
padding-left: 10px;
font-size: 16px;
flex: 1;
`;





export default UserLIst