import { StatusCode } from 'types/StatusCode';

import api from './';

import type {
  ZipkokResponse,
  ZipkokResponseWithCode,
} from 'types/ZipkokResponse';

interface RefreshTokensResult {
  authTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshTokenExpiresIn: number;
  };
}

/**
 * `POST /auth/refreshToken`에 요청을 보내 액세스 토큰과 리프레시 토큰을 갱신합니다.
 */
export async function refreshTokens(refreshToken: string) {
  const path = '/auth/refreshToken';
  const method = 'POST';
  const body = {
    refreshToken,
  };
  const authRequired = false;

  const res = await api<ZipkokResponse<RefreshTokensResult | undefined>>(
    path,
    method,
    authRequired,
    undefined,
    body,
    undefined,
  );

  if (res.code === StatusCode.TOKEN_REFRESH_SUCCESS) {
    const result = res as ZipkokResponseWithCode<
      RefreshTokensResult,
      StatusCode.TOKEN_REFRESH_SUCCESS
    >;
    return result;
  } else {
    return res as ZipkokResponseWithCode<
      undefined,
      StatusCode.INVALID_REFRESH_TOKEN
    >;
  }
}
