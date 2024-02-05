import api from '.';

import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `GET /user/logout`으로 로그아웃을 요청합니다.
 * 쿠키에 저장된 토큰을 삭제하지는 않습니다.
 */
export async function logout() {
  const path = '/user/logout';
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<undefined>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res;
}
