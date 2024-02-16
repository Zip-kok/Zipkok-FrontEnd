import api from './';

import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `DELETE /user`로 회원 탈퇴를 요청합니다.
 */
export async function deleteUser() {
  const path = '/user';
  const method = 'DELETE';
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
