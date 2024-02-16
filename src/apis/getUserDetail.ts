import { Address } from 'types/Address';

import api from './';

import type { Gender } from 'pages/SignIn';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface UserDetail {
  imageURL: string;
  nickname: string;
  birthday: string;
  gender: Gender;
  address: Address;
  realEstateType: HouseType;
  transactionType: PriceType;
  mpriceMin: number;
  mpriceMax: number;
  mdepositMin: number;
  mdepositMax: number;
  ydepositMin: number;
  ydepositMax: number;
  priceMin: number;
  priceMax: number;
}

/**
 * `GET /user/detail`으로 리스트 항목을 가져옵니다.
 */
export async function getUserDetail() {
  const path = '/user/detail';
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<UserDetail>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res as ZipkokResponse<UserDetail>;
}
