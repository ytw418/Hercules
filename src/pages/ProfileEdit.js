import React from 'react'
import { useNavigate } from 'react-router-dom';
import CreateUser from '../components/CreateUser';
import BottomTeb from '../components/BottomTeb';
function ProfileEdit() {

  return (
    <>
    <CreateUser></CreateUser>
    <BottomTeb></BottomTeb>
    </>
  )
}

export default ProfileEdit