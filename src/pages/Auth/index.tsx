import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { kakaoLogin } from 'apis';
import useEmailStore from 'contexts/emailStore';
import storeToken from 'utils/storeToken';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const setEmail = useEmailStore((store) => store.setEmail);

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    if (code !== null) {
      kakaoLogin(code)
        .then((res) => {
          // 회원인 경우
          if (res.result.isMember) {
            const {
              accessToken,
              refreshToken,
              expiresIn,
              refreshTokenExpiresIn,
            } = res.result.authTokens;
            storeToken(
              accessToken,
              refreshToken,
              expiresIn,
              refreshTokenExpiresIn,
            );
            navigate('/');
          }
          // 회원이 아닌 경우
          else if (res.result.isMember === false) {
            setEmail(res.result.email);
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
