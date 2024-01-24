import { url } from 'constants/api';

import { ZipkokResponse } from 'types/ZipkokResponse';

import api from './';

interface KakaoLoginResult {
  isMember: boolean;
}

interface KaKaoLoginResultForMember extends KakaoLoginResult {
  isMember: true;
  authTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshTokenExpiresIn: number;
  };
}

interface KaKaoLoginResultForNonMember extends KakaoLoginResult {
  isMember: false;
  email: string;
}

/**
 * `GET /oauth/kakao/callback`으로 카카오 로그인을 요청하고 토근을 받아옵니다.
 */
export async function kakaoLogin(code: string) {
  const params = {
    code,
  };
  const paramStr = new URLSearchParams(params).toString();

  const res = await fetch(`${url}/oauth/kakao/callback?${paramStr}`);
  const data = (await res.json()) as ZipkokResponse<KakaoLoginResult>;

  if (data.result.isMember)
    return data as ZipkokResponse<KaKaoLoginResultForMember>;
  else return data as ZipkokResponse<KaKaoLoginResultForNonMember>;
}
