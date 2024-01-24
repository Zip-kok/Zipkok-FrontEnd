import api from './';

import type { Gender } from 'pages/SignIn';
import type { ZipkokResponse } from 'types/ZipkokResponse';

interface SignInResult {
  isMember: boolean;
  authTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshTokenExpiresIn: number;
  };
}

/**
 * `POST /user`으로 회원가입을 요청합니다.
 */
export async function signIn(
  nickname: string,
  oauthProvider = 'KAKAO',
  email: string,
  gender: Gender,
  birth: Date,
) {
  let convertedGender = '';
  switch (gender) {
    case '남자':
      convertedGender = 'MALE';
      break;
    case '여자':
      convertedGender = 'FEMALE';
      break;
    case '비공개':
      convertedGender = 'UNDISCLOSED';
      break;
  }

  const path = '/user';
  const method = 'POST';
  const body = {
    nickname,
    oauthProvider,
    email,
    gender: convertedGender,
    birthday: birth.toISOString().slice(2, 10).replace(/-/g, ''),
  };
  const authRequired = false;

  const res = await api<ZipkokResponse<SignInResult>>(
    path,
    method,
    authRequired,
    undefined,
    body,
    undefined,
  );

  return res;
}
