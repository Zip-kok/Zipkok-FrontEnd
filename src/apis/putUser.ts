import api from './';

import type { Gender } from 'pages/SignIn';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

// 사용자 프로필 업데이트를 위한 인터페이스 정의
interface User {
  file: string;
  data: {
    nickname: string;
    birthday: string;
    gender: Gender;
    realEstateType: HouseType;
    address: string;
    latitude: number;
    longitude: number;
    transactionType: PriceType;
    mpriceMin: number;
    mpriceMax: number;
    mdepositMin: number;
    mdepositMax: number;
    ydepositMin: number;
    ydepositMax: number;
    purchaseMin: number;
    purchaseMax: number;
  };
}

/**
 * 사용자 프로필 업데이트를 위한 PUT API 호출 함수
 */
export async function putUser(user: User) {
  const path = '/path/to/put/user/profile'; // 실제 API 경로로 수정 필요
  const method = 'PUT';
  const body = user;
  const authRequired = true;

  const res = await api<ZipkokResponse<undefined>>(
    path,
    method,
    authRequired,
    undefined,
    body,
  );

  return res;
}
