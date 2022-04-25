import React from 'react'
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {

   const goBack = () => {
      const confirm = window.confirm('편집을 완료하셨습니까?')
      if (confirm) {
         navigate(-1);
       }
     };

  return (
    <div>ProfileEdit</div>
  )
}

export default ProfileEdit