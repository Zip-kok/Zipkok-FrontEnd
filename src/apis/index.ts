import { url } from 'constants/api';

import Cookies from 'js-cookie';
import storeNewTokensToCookie from 'utils/storeNewTokensToCookie';

import { deletePin } from './deletePin';
import { deleteUser } from './deleteUser';
import { deleteZim } from './deleteZim';
import { getDirection } from './getDirection';
import { getKokConfig } from './getKokConfig';
import { getKokContract } from './getKokContract';
import { getKokDetail } from './getKokDetail';
import { getKokInner } from './getKokInner';
import { getKokOuter } from './getKokOuter';
import { getKokReview } from './getKokReview';
import { getMapRealEstate } from './getMapRealEstate';
import { getMyPageInfo } from './getMyPageInfo';
import { getPin } from './getPin';
import { getProfileEditInfo } from './getProfileEditInfo';
import { getRealEstateInfo } from './getRealEstateInfo';
import { getUserDetail } from './getUserDetail';
import { getUserKokList } from './getUserKokList';
import { getUserKokOption } from './getUserKokOption';
import { getZim } from './getZim';
import { kakaoLogin } from './kakaoLogin';
import { logout } from './logout';
import { onBoarding } from './onBoarding';
import { postKok } from './postKok';
import { postPin } from './postPin';
import { postRealEstate } from './postRealEstate';
import { putKok } from './putKok';
import { putPin } from './putPin';
import { putUser } from './putUser';
import putUserKokOption from './putUserKokOption'; // TODO: named export로 변경
import { refreshTokens } from './refreshTokens';
import { searchAddress } from './searchAddress';
import { signIn } from './signIn';
import { zim } from './zim';

export {
  deletePin,
  deleteUser,
  putKok,
  searchAddress,
  getDirection,
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
  getMyPageInfo,
  getProfileEditInfo,
  getMapRealEstate,
  logout,
  getUserKokOption,
  putUserKokOption,
  getPin,
  postPin,
  putPin,
  getRealEstateInfo,
  getUserKokList,
  putUser,
  getKokConfig,
  postRealEstate,
  postKok,
};

/**
 * 필요한 경우에 토큰 갱신을 먼저 수행하고 서버에 요청을 보냅니다.
 * `authRequired`가 `false`이면 토큰 갱신을 수행하지 않습니다.
 * @param path 요청을 보낼 하위 경로 (예: `/user`)
 * @param method HTTP 메소드
 * @param authRequired 인증이 필요한지 여부
 * @param params 쿼리 파라미터
 * @param body 요청 바디
 * @param headers 요청 헤더
 * @param contentType 요청 컨텐츠 타입
 */
export default async function api<T>(
  path: string,
  method = 'GET',
  authRequired: boolean,
  params?: any,
  body?: any,
  headers?: any,
  contentType?: string | null,
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

  let contentTypeHeader = {};

  if (contentType) contentTypeHeader = { 'Content-Type': contentType };
  else if (contentType === null) contentTypeHeader = {};
  else if (method !== 'GET')
    contentTypeHeader = { 'Content-Type': 'application/json' };

  const paramStr = params ? new URLSearchParams(params).toString() : '';
  const res = await fetch(`${url}${path}${paramStr ? '?' : ''}${paramStr}`, {
    method,
    headers: {
      ...contentTypeHeader,
      ...authHeader,
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as T;
  return data;
}
