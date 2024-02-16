import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';

import { kakaoLogin } from 'apis';
import { getUserDetail } from 'apis';
import useEmailStore from 'contexts/emailStore';
import useModal from 'contexts/modalStore';
import useMyPageStore from 'contexts/useMyPageStore';
import MyPageStore from 'contexts/useMyPageStore';
import { Gender } from 'pages/SignIn';
import { Address } from 'types/Address';
import storeToken from 'utils/storeToken';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const modal = useModal();
  const setEmail = useEmailStore((store) => store.setEmail);
  const MyPageStore: any = useMyPageStore();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    // code가 있을 시
    if (code !== null) {
      kakaoLogin(code)
        .then((res) => {
          // 오류가 발생한 경우
          if (res.result === undefined) throw new Error(res.message);

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
            getUserDetail().then((res) => {
              MyPageStore.setImageUrl(res.result.imageUrl);
              MyPageStore.setNickname(res.result.nickname);
              MyPageStore.setBirthday(res.result.birthday);
              MyPageStore.setGender(res.result.gender);
              //api 수정필요
              MyPageStore.setAddress(res.result.address);
              MyPageStore.setRealEstateType(res.result.realEstateType);
              MyPageStore.setTransactionType(res.result.transactionType);
            });
            navigate('/');
          }

          // 회원이 아닌 경우
          else if (res.result.isMember === false) {
            setEmail(res.result.email);
            navigate('/signin');
          }
        })
        .catch((err) => {
          modal
            .open({
              title: '오류가 발생했어요.',
              description: err.message,
              primaryButton: '확인',
            })
            .then((res) => {
              navigate('/login');
            });
        });
    }
    // code가 없을 시
    else {
      navigate('/login');
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <BeatLoader />
      <p>카카오 로그인 중...</p>
    </div>
  );
}
