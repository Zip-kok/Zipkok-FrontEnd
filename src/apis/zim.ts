import api from './';

import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `POST /zim`으로 매물 찜을 요청합니다.
 */
export async function zim(realEstateId: number) {
  const path = '/zim';
  const method = 'POST';
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
