import api from './';

import type { HouseType } from 'types/HouseType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * 온보딩 페이지에서 입력한 모든 정보를 `PATCH /user`으로 전송합니다.
 */
export async function onBoarding(
  address: string,
  latitude: number,
  longitude: number,
  houseType: HouseType,
  mpriceMin: number,
  mpriceMax: number,
  mdepositMin: number,
  mdepositMax: number,
  ydepositMin: number,
  ydepositMax: number,
  purchaseMin: number,
  purchaseMax: number,
) {
  let realEstateType: string;
  switch (houseType) {
    case '빌라/투룸':
      realEstateType = 'TWOROOM';
      break;
    case '아파트':
      realEstateType = 'APARTMENT';
      break;
    case '오피스텔':
      realEstateType = 'OFFICETELL';
      break;
    case '원룸':
      realEstateType = 'ONEROOM';
      break;
  }

  const path = '/user';
  const method = 'PATCH';
  const body = {
    address,
    latitude,
    longitude,
    realEstateType,
    mpriceMin: Math.floor(mpriceMin),
    mpriceMax: Math.floor(mpriceMax),
    mdepositMin: Math.floor(mdepositMin),
    mdepositMax: Math.floor(mdepositMax),
    ydepositMin: Math.floor(ydepositMin),
    ydepositMax: Math.floor(ydepositMax),
    purchaseMin: Math.floor(purchaseMin),
    purchaseMax: Math.floor(purchaseMax),
  };
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
