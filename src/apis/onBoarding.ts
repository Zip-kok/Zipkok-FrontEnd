import { url } from 'constants/api';

import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * 온보딩 페이지에서 입력한 모든 정보를 `PATCH /user`으로 전송합니다.
 */
export async function onBoarding(
  address: string,
  latitude: number,
  longitude: number,
  realEastateType: string,
  mpriceMin: number,
  mpriceMax: number,
  mdepositMin: number,
  mdepositMax: number,
  ydepositMin: number,
  ydepositMax: number,
  purchaseMin: number,
  purchaseMax: number,
) {
  const params = {
    address,
    latitude,
    longitude,
    realEastateType,
    mpriceMin,
    mpriceMax,
    mdepositMin,
    mdepositMax,
    ydepositMin,
    ydepositMax,
    purchaseMin,
    purchaseMax,
  };
  const paramStr = JSON.stringify(params);

  const res = await fetch(`${url}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: paramStr,
  });
  const data = (await res.json()) as ZipkokResponse<undefined>;
  return data;
}
