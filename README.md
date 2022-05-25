# breeder - 생물인을 위한 웹서비스 프로젝트

# 실행
* npm install
* npm start

# 빌드 
* npm run build 
* 
# 배포
* firebase deploy

# 추가시킬 기능

1. 해쉬태그 입력,검색
2. 댓글기능 - 완료
3. 채팅기능 - 진행중
4. 팔로우 팔로잉 기능
5. 실시간 포스트 디비 조회, 랜더링



회원가입 성공시 유니크 아이디를 받아서 데이터 베이스에 유저 데이터 생성

파이어베이스 팁

1.   firebase_db.ref(`posts`).orderByChild('date').equalTo(5).once('value').then((snapshot) => {
         setPosts(snapshot.val());
      })
          //date 값이 넘버 5 인 객체 찾기

2. 
