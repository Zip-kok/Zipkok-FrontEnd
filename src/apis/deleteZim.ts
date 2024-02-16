import api from './';

import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `DELETE /zim`으로 찜 취소를 요청합니다.
 */
export async function deleteZim(realEstateId: number) {
  const path = '/zim';
  const method = 'DELETE';
  const body = { realEstateId };
  const authRequired = true;

  const res = await api<ZipkokResponse<undefined>>(
    path,
    method,
    authRequired,
    undefined,
    body,
    undefined,
  );

  return res;
}
