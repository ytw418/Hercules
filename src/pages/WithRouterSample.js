import React from 'react';
//버전 v6 
//withRouter, useRouteMatch, match, 사라짐
//기존 history의 모든 기능은 useNavigate로 통합되었다
// match 는 useParams 로 변경
import { useParams, useLocation, useNavigate} from 'react-router-dom';
const WithRouterSample = () => {
   const params = useParams();
   const location = useLocation();
   const navigate = useNavigate();

  return (
    <div>
      <h4>location</h4>
      <textarea value={JSON.stringify(location, null, 2)} readOnly />
      <h4>match</h4>
      <textarea value={JSON.stringify(params)} readOnly />
      <button onClick={() => navigate('/')}>홈으로</button>
    </div>
  );
};

export default WithRouterSample;