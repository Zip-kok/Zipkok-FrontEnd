import api from './';

import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `DELETE /zim`으로 찜 취소를 요청합니다.
 */
export async function deleteZim() {
  const path = '/zim';
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
