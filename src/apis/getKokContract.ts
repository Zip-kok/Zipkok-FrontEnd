import api from '.';

import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface KokContract {
  options: options[];
  imageInfo: {
    imageNumber: number;
    imageURL: string[];
  };
}
export interface options {
  option: string;
  orderNumber: number;
  detailOption: string[];
}
/**
 * `GET /kok/{kokId}/contract`
 * 콕리스트_작성한리스트 확인 (5가지 항목) 에서 “중개 계약” 탭 클릭시 호출되는 API
 * 콕의 중개/계약 정보 반환
 * {kokId} : 집 주변 정보 조회를 원하는 콕의 ID
 * @param number kokId
 */
export async function getKokContract(kokId: number) {
  const path = '/kok/${kokId}/contract';
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<KokContract>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res as ZipkokResponse<KokContract>;
}
