import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  function millisecondsToDays(ms: number) {
    return ms / 1000 / 60 / 60 / 24;
  }

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    fetch(`https://zipkok.store/oauth/kakao/callback?code=${code}`)
      .then((res) => res.json())
      .then((res) => {
        // 회원인 경우
        if (res.code === 5000) {
          const authTokens = res.result.authTokens;

          // expiresIn의 단위는 ms
          // 토큰 저장
          Cookies.set('accessToken', authTokens.accessToken, {
            expires: millisecondsToDays(authTokens.accessTokenExpiresIn),
            secure: true,
            sameSite: 'none',
          });
          Cookies.set('refreshToken', authTokens.refreshToken, {
            expires: millisecondsToDays(authTokens.refreshTokenExpiresIn),
            secure: true,
            sameSite: 'none',
          });

          navigate('/');
        }
        // 회원이 아닌 경우
        else if (res.code === 5001) {
          navigate('/signin');
        }
        // 에러 발생 시
        else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        alert(err.message);
        navigate('/login');
      });
  }, []);

  return <div>카카오 로그인 중...</div>;
}
