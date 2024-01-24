import { url } from 'constants/api';

import { StatusCode } from 'types/StatusCode';
import { ZipkokResponse, ZipkokResponseWithCode } from 'types/ZipkokResponse';

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
  const params = {
    refreshToken,
  };
  const paramStr = JSON.stringify(params);

  const res = await fetch(`${url}/auth/refreshToken?`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: paramStr,
  });
  const data = (await res.json()) as ZipkokResponse<
    RefreshTokensResult | undefined
  >;

  if (data.code === StatusCode.TOKEN_REFRESH_SUCCESS) {
    const result = data as ZipkokResponseWithCode<
      RefreshTokensResult,
      StatusCode.TOKEN_REFRESH_SUCCESS
    >;
    return result;
  } else {
    return data as ZipkokResponseWithCode<
      undefined,
      StatusCode.INVALID_REFRESH_TOKEN
    >;
  }
}
