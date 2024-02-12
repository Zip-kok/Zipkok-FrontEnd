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
 * `GET /oauth/kakao/callback`으로 카카오 로그인을 요청하고 토큰을 받아옵니다.
 */
export async function kakaoLogin(code: string) {
  const path = '/oauth/kakao/callback';
  const method = 'GET';
  const params = {
    code,
  };
  const authRequired = false;

  const res = await api<ZipkokResponse<undefined | KakaoLoginResult>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  if (res.result === undefined) return res as ZipkokResponse<undefined>;

  if (res.result.isMember)
    return res as ZipkokResponse<KaKaoLoginResultForMember>;
  else return res as ZipkokResponse<KaKaoLoginResultForNonMember>;
}
