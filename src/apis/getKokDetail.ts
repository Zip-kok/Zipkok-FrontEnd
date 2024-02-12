import api from '.';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface KokDetail {
  kokId: number;
  imageInfo: imageInfo[];
  address: string;
  detailAddress: string;
  transactionType: PriceType;
  deposit: number;
  price: number;
  detail: string;
  areaSize: number;
  pyeongsu: number;
  realEstateType: HouseType;
  floorNum: number;
  administraiveFee: number;
  langtitude: number;
  longtitude: number;
  isZimmed: boolean;
}
export interface imageInfo {
  imageNumber: number;
  imageUrls: string[];
}
/**
 * `GET /kok/{kokId}/detail`
 * 콕리스트에서 특정 콕을 클릭시 호출되는 API
 * 콕의 세부정보 정보 반환
 * {kokId} : 집 주변 정보 조회를 원하는 콕의 ID
 * @param number kokId
 */
export async function getKokDetail(kokId: number) {
  const path = `/kok/${kokId}/detail`;
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<KokDetail>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res as ZipkokResponse<KokDetail>;
}
