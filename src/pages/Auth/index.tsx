import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { kakaoLogin } from 'apis';
import useEmailStore from 'contexts/emailStore';
import Cookies from 'js-cookie';
import { StatusCode } from 'types/StatusCode';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const setEmail = useEmailStore((store) => store.setEmail);

  function millisecondsToDays(ms: number) {
    return ms / 1000 / 60 / 60 / 24;
  }

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    if (code !== null) {
      kakaoLogin(code)
        .then((res) => {
          // 회원인 경우
          if (res.result.isMember) {
            const authTokens = res.result.authTokens;

            // expiresIn의 단위는 ms
            // 토큰 저장
            Cookies.set('accessToken', authTokens.accessToken, {
              expires: millisecondsToDays(authTokens.expiresIn),
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
          else if (res.result.isMember === false) {
            setEmail(res.result.email as string);
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
    }
  }, []);

  return <div>카카오 로그인 중...</div>;
}
