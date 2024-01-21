import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    fetch(`https://zipkok.store/oauth/kakao/callback?code=${code}`)
      .then((res) => res.json())
      .then((res) => {
        // 회원인 경우
        if (res.code === 5000) {
          const authTokens = res.result.authTokens;
          // TODO: 토큰 저장
          navigate('/');
        }
        // 회원이 아닌 경우
        else if (res.code === 5001) {
          navigate('/signup');
        }
      })
      .catch((err) => {
        alert(err);
        navigate('/login');
      });
  }, []);

  return <div>카카오 로그인 중...</div>;
}
