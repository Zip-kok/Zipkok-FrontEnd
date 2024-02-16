import api from './';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface RawRealEstate {
  realEstateId: number;
  imageURL: string;
  deposit: number;
  price: number;
  address: string;
  agent: string;
  transactionType: string;
  realestateType: string;
}

export interface RealEstate {
  realEstateId: number;
  imageURL: string;
  deposit: number;
  price: number;
  address: string;
  agent: string;
  transactionType: PriceType;
  realestateType: HouseType;
}

interface GetZimResult<T> {
  realEstateInfo: T[];
}

/**
 * `GET /zim`으로 찜한 매물 목록을 요청합니다.
 */
export async function getZim() {
  const path = '/zim';
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<GetZimResult<RawRealEstate>>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  function convertTransactionType(type: string): PriceType {
    switch (type) {
      case 'MONTHLY':
        return '월세';
      case 'YEARLY':
        return '전세';
      case 'PURCHASE':
        return '매매';
      default:
        return '월세';
    }
  }

  return {
    ...res,
    result: {
      ...res.result,
      realEstateInfo: res.result.realEstateInfo.map((realEstate) => ({
        ...realEstate,
        transactionType: convertTransactionType(realEstate.transactionType),
        realestateType: realEstate.realestateType,
      })),
    },
  } as ZipkokResponse<GetZimResult<RealEstate>>;
}
