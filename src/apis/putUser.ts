import Cookies from 'js-cookie';
import storeNewTokensToCookie from 'utils/storeNewTokensToCookie';

import type { Gender } from 'pages/SignIn';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

// 사용자 프로필 업데이트를 위한 인터페이스 정의
interface User {
  file: File;
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
export async function putUser(file: File, user: User) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append(
    'data',
    new Blob([JSON.stringify(user.data)], {
      type: 'application/json',
    }),
  );

  let accessToken = Cookies.get('accessToken');

  // access token 만료 시
  if (accessToken === undefined) {
    accessToken = await storeNewTokensToCookie().then((res) => {
      if (res === null) throw new Error('로그인이 필요합니다.');
      return res.accessToken;
    });
  }

  const res = (await fetch('https://zipkok.store/user', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  }).then((res) => res.json())) as ZipkokResponse<undefined>;
  return res;
}
