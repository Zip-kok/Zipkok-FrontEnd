import api from '.';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface MyPageInfo {
  nickname: string;
  imageUrl: string;
  address: string;
  realEstateType: HouseType;
  transactionType: PriceType;
  priceMax: number;
  depositMax: number;
  priceMin: number;
  depositMin: number;
}

/**
 * `GET /user`로 마이 페이지 회원의 정보를 요청합니다.
 */

export const getMyPageInfo = async () => {
  const path = `/user`;
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<MyPageInfo>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );
  return res as ZipkokResponse<MyPageInfo>;
};
