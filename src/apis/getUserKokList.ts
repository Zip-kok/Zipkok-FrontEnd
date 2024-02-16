import api from '.';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface UserKokList {
  koks: {
    kokId: number;
    imageUrl: string;
    address: string;
    detailAddress: string;
    estateAgent: string;
    transactionType: PriceType;
    realEstateType: HouseType;
    deposit: number;
    price: number;
    isZimmed: boolean;
  }[];
  meta: {
    is_end: boolean;
    current_page: number;
    total_page: number;
  };
}

/**
 * `GET /kok?page=?size=?`
 * 콕리스트 탭 선택시 호출되는 API
 * 사용자가 작성한 콕리스트가 모두 반환 (무한 스크롤)
 * {kokId} : 집 주변 정보 조회를 원하는 콕의 ID
 * @param number kokId
 */
export async function getUserKokList(page: number, size: number) {
  const path = `/kok`;
  const method = 'GET';
  const params = { page, size };
  const authRequired = true;

  const res = await api<ZipkokResponse<UserKokList>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res as ZipkokResponse<UserKokList>;
}
