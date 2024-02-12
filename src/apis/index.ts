import { url } from 'constants/api';

import Cookies from 'js-cookie';
import storeNewTokensToCookie from 'utils/storeNewTokensToCookie';

import { deleteZim } from './deleteZim';
import { getKokContract } from './getKokContract';
import { getKokDetail } from './getKokDetail';
import { getKokInner } from './getKokInner';
import { getKokOuter } from './getKokOuter';
import { getKokReview } from './getKokReview';
import { getUserDetail } from './getUserDetail';
import { getUserKokOption } from './getUserKokOption';
import { getZim } from './getZim';
import { kakaoLogin } from './kakaoLogin';
import { logout } from './logout';
import { onBoarding } from './onBoarding';
import { refreshTokens } from './refreshTokens';
import { searchAddress } from './searchAddress';
import { signIn } from './signIn';
import { zim } from './zim';

export {
  searchAddress,
  signIn,
  kakaoLogin,
  refreshTokens,
  onBoarding,
  getZim,
  zim,
  deleteZim,
  getUserDetail,
  getKokContract,
  getKokDetail,
  getKokInner,
  getKokOuter,
  getKokReview,
  logout,
};

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
  let accessToken = Cookies.get('accessToken');

  // access token 만료 시
  if (authRequired && accessToken === undefined) {
    accessToken = await storeNewTokensToCookie().then((res) => {
      if (res === null) throw new Error('로그인이 필요합니다.');
      return res.accessToken;
    });
  }

  const authHeader = authRequired
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};

  const paramStr = params ? new URLSearchParams(params).toString() : '';
  const res = await fetch(`${url}${path}?${paramStr}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T;
  return data;
}
