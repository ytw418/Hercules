//단축키 정리

rscm  =  import React, { memo } from 'react';

const ChatRoom = memo(() => {
   return (
      <div>
         
      </div>
   );
});

export default ChatRoom;


clo  =  console.log('object :>> ', object);

clg = console.log(object);



//객체를 키:값 형태로 배열로 반환
Object.entries(val)



//파이어베이스 팁

1.   firebase_db.ref(`posts`).orderByChild('date').equalTo(5).once('value').then((snapshot) => {
         setPosts(snapshot.val());
      })
          //date 값이 넘버 5 인 객체 찾기

2. 