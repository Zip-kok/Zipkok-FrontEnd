import isLoggedIn from 'utils/isLoggedIn';

import api from '.';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface MapRealEstate {
  filter: {
    transactionType: PriceType;
    realEstateType: HouseType;
    mdepositMin: number;
    mdepositMax: number;
    mpriceMin: number;
    mpriceMax: number;
    ydepositMin: number;
    ydepositMax: number;
    purchaseMin: number;
    purchaseMax: number;
  };
  realEstateInfoList: [
    {
      realEstateId: number;
      imageURL: string;
      deposit: number;
      price: number;
      transactionType: PriceType;
      realEstateType: HouseType;
      address: string;
      detailAddress: string;
      latitude: number;
      longitude: number;
      agent: string;
      isZimmed: boolean;
      isKokked: boolean;
    },
  ];
}

export const getMapRealEstate = async (
  southWestLat: number,
  southWestLon: number,
  northEastLat: number,
  northEastLon: number,
) => {
  const path = `/realEstate`;
  const method = 'GET';
  const params = {
    southWestLat,
    southWestLon,
    northEastLat,
    northEastLon,
  };

  if (isLoggedIn()) {
    const res = await api<ZipkokResponse<MapRealEstate>>(
      path,
      method,
      true,
      params,
      undefined,
      undefined,
    );
    return res as ZipkokResponse<MapRealEstate>;
  } else {
    const res = await api<ZipkokResponse<MapRealEstate>>(
      path,
      method,
      false,
      params,
      undefined,
      undefined,
    );
    return res as ZipkokResponse<MapRealEstate>;
  }
};
