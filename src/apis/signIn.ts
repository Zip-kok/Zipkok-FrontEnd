import { url } from 'constants/api';

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
  const params = {
    nickname,
    oauthProvider,
    email,
    gender,
    brith: birth.toISOString().slice(2, 10).replace(/-/g, ''),
  };
  const paramStr = JSON.stringify(params);

  const res = await fetch(`${url}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: paramStr,
  });
  const data = (await res.json()) as ZipkokResponse<SignInResult>;
  return data;
}
