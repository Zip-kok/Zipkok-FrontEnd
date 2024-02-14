import api from '.';

import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface MapRealEstate {
  filter: {
    transactionType: string;
    realEstateType: string;
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
      transactionType: string;
      realEstateType: string;
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
  const authRequired = true;

  const res = await api<ZipkokResponse<MapRealEstate>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );
  return res as ZipkokResponse<MapRealEstate>;
};
