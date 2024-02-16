import type { HouseType } from './HouseType';
import type { PriceType } from './PriceType';

interface UserInfo {
  imageUrl: string;
  nickname: string;
  birthday: string;
  gender: Gender;
  realEstateType?: HouseType;
  address: string;
  latitude: number;
  longitude: number;
  transactionType?: PriceType;
  mpriceMin?: number;
  mpriceMax?: number;
  mdepositMin?: number;
  mdepositMax?: number;
  ydepositMin?: number;
  ydepositMax?: number;
  purchaseMin?: number;
  purchaseMax?: number;
}

export type { UserInfo };
