import { Gender } from 'pages/SignIn';

import api from './';

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
  const contentPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = async function (evt) {
      const pdfContent: string = evt?.target?.result as string;
      resolve(pdfContent);
    };

    reader.readAsBinaryString(file);
  });

  const binaryContent = await contentPromise;

  const boundary = 'WebAppBoundary';
  const content = `--WebAppBoundary
  Content-Disposition: form-data; name="file"; filename="${file.name}"
  Content-Type: application/pdf
  
  ${binaryContent}
  --WebAppBoundary--`;
  console.log(content);
  const formData = new FormData();

  formData.append('file', content);
  // content.append('data', JSON.stringify(user.data));
  // formData.append('data', JSON.stringify(user.data));

  console.log(formData);
  const path = '/user';
  const method = 'PUT';
  const headers = {
    'Content-Type': 'multipart/form-data; boundary=WebAppBoundary',
  };
  const authRequired = true;

  const res = await api<ZipkokResponse<undefined>>(
    path,
    method,
    authRequired,
    undefined,
    formData,
    headers,
  );
  return res;
}
