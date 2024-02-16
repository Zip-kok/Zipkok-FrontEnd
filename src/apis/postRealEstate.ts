import api from 'apis';

import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';
interface postRealEstateInfo {
  realEstateId: number;
}
/**
 * `POST /realEstate`으로 매물 등록을 요청합니다.
 */

export async function postRealEstate(
  realEstateName: string,
  transactionType: string,
  realEstateType: string,
  deposit: number,
  price: number,
  administrativeFee: number,
  address: string,
  detailAddress: string,
  latitude: number,
  longitude: number,
  pyeongsu: number,
  floorNum: number,
) {
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
  const path = '/realEstate';
  const method = 'POST';
  const body = {
    realEstateName,
    transactionType,
    realEstateType,
    deposit,
    price,
    administrativeFee,
    address,
    detailAddress,
    latitude,
    longitude,
    pyeongsu,
    floorNum,
  };
  const authRequired = true;
  const res = await api<ZipkokResponse<postRealEstateInfo>>(
    path,
    method,
    authRequired,
    undefined,
    body,
    undefined,
  );

  return {
    ...res,
    result: {
      ...res.result,
      transactionType: convertTransactionType(transactionType),
    },
  };
}
