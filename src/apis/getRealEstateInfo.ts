import api from './';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface GetRealEstateInfoResult {
  realEstateId: number;
  imageInfo: {
    imageNumber: number;
    imageURL: string[];
  };
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
  administrativeFee: number;
  latitude: number;
  longitude: number;
  isZimmed: boolean;
  isKokked: boolean;
}

/**
 * `GET /realEstate/{realEstateId}`로 매물 상세 정보를 요청합니다.
 */
export async function getRealEstateInfo(realEstateId: number) {
  const path = `/realEstate/${realEstateId}`;
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<GetRealEstateInfoResult>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res as ZipkokResponse<GetRealEstateInfoResult>;
}
