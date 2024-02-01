import api from './';

import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface RealEstate {
  realEstateId: number;
  imageURL: string;
  deposit: number;
  price: number;
  address: string;
  agent: string;
}

interface GetZimResult {
  realEstateInfo: RealEstate[];
}

/**
 * `GET /zim`으로 찜한 매물 목록을 요청합니다.
 */
export async function getZim() {
  const path = '/zim';
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<GetZimResult>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res;
}
