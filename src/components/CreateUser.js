import React, { useContext, useRef, useCallback, useState, } from 'react';
import { useTodoDispatch, useUID } from '../ContextApi';
import useInputs from './useInputs';
import { firebase_db, imageStorage } from "../firebaseConfig"




const CreateUser = () => {
  const nextId = useRef(4);
  const [attachment, setAttachment] = useState();
  const [url, setUrl] = useState();

  const dispatch = useTodoDispatch();
  const uid = useUID();

  const [{ username, text }, onChange, reset] = useInputs({
    username: '',
    text: ''
  });
  const onSubmit = async () => {

    let attachmentUrl = ""
    if (attachment !== "") {
      const attachmentRef = imageStorage.ref().child(`${uid}/profile/photo`)
      const response = await attachmentRef.putString(attachment, 'data_url')
      attachmentUrl = await response.ref.getDownloadURL()
    }
    setUrl(attachmentUrl)

  }

  const onFileChange = async (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)


  }

  const onClearAttachment = () => {
    setAttachment(null);
  };





  return (
    <div>
      <input type='file' accept='image/*' onChange={onFileChange} />
      {attachment && (
        <div>
          <img src={attachment} alt="attachment" width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
      <button onClick={onSubmit}>등록</button>


      <input
        name="username"
        placeholder="이름"
        onChange={onChange}
        value={username}
      />
      <input
        name="text"
        placeholder="text"
        onChange={onChange}
        value={text}
      />
      <button onClick={() => {
        firebase_db.ref(`/users/${uid}/Profile/`).set({
          Uid: `${uid}`,
          Username: `${username}`,
          Userphoto: `${url}`,
          Introduce: `${text}`,
        });
        
        firebase_db.ref(`/users/${uid}/`).once('value').then((snapshot) => {
          console.log("로그인회원 파이어베이스 조회 성공")
          dispatch({
            type: 'LOGIN_USER',
            user: snapshot.val(),
          })
      });
        alert("프로필편집 완료");

      }}>유저 프로필 등록</button>
    </div>
  );
};

export default React.memo(CreateUser);