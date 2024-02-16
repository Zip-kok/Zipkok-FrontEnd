import api from 'apis';

import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * 메인에서 필터 설정 정보를 `PATCH /user`으로 전송합니다.
 */

export async function patchUserFilter(
  transactionType: string,
  realEstateType: string,
  priceMin: number,
  priceMax: number,
  depositMin: number,
  depositMax: number,
) {
  const path = '/user/filter';
  const method = 'PATCH';
  const body = {
    transactionType,
    realEstateType,
    priceMin,
    priceMax,
    depositMin,
    depositMax,
  };
  console.log(body);
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
