import api from '.';

import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface KokInner {
  furnitureOptions: string[];
  direction: string;
  options: {
    option: string;
    orderNumber: number;
    detailOptions: string[];
  }[];
}

/**
 * `GET /kok/{kokId}/inner`
 * 콕리스트_작성한리스트 확인 (5가지 항목) 에서 “집 주변” 탭 클릭시 호출되는 API
 * 콕의 집 내부 정보 반환
 * {kokId} : 집 주변 정보 조회를 원하는 콕의 ID
 * @param number kokId
 */
export async function getKokInner(kokId: number) {
  const path = `/kok/${kokId}/inner`;
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<KokInner>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res as ZipkokResponse<KokInner>;
}
