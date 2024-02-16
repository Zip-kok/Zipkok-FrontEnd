import api from 'apis';

import type { Gender } from 'pages/SignIn';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface ProfileEditInfo {
  imageUrl: string;
  nickname: string;
  birthday: string;
  gender: Gender;
  address: string;
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
 * `GET /user/detail`로 프로필 수정하기 정보를 요청합니다.
 */
export const getProfileEditInfo = async () => {
  const path = `/user/detail`;
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<ProfileEditInfo>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );
  return res as ZipkokResponse<ProfileEditInfo>;
};
