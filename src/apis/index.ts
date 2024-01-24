import { url } from 'constants/api';

import Cookies from 'js-cookie';
import storeNewTokensToCookie from 'utils/storeNewTokensToCookie';

import { kakaoLogin } from './kakaoLogin';
import { onBoarding } from './onBoarding';
import { refreshTokens } from './refreshTokens';
import { searchAddress } from './searchAddress';
import { signIn } from './signIn';

export { searchAddress, signIn, kakaoLogin, refreshTokens, onBoarding };

/**
 * 필요한 경우에 토큰 갱신을 먼저 수행하고 서버에 요청을 보냅니다.
 * `authRequired`가 `false`이면 토큰 갱신을 수행하지 않습니다.
 * @param path 요청을 보낼 하위 경로 (예: `/user`)
 * @param method HTTP 메소드
 * @param params 쿼리 파라미터
 * @param body 요청 바디
 * @param headers 요청 헤더
 * @param authRequired 인증이 필요한지 여부
 */
export default async function api<T>(
  path: string,
  method = 'GET',
  authRequired: boolean,
  params?: any,
  body?: any,
  headers?: any,
) {
  // access token 만료 시
  if (authRequired && Cookies.get('accessToken') === undefined) {
    const authorized = await storeNewTokensToCookie();
    if (!authorized) throw new Error('로그인이 필요합니다.');
  }

  const paramStr = params ? new URLSearchParams(params).toString() : '';
  const res = await fetch(`${url}${path}?${paramStr}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T;
  return data;
}
