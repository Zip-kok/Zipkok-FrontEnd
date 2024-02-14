import api from '.';

import type { Pin } from 'types/Pin';
import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `GET /pim`으로 핀 정보를 요청합니다.
 */
export const getPin = async () => {
  //const path = `/pin`;
  //const method = 'GET';
  //const params = {};
  //const authRequired = true;

  //const res = await api<ZipkokResponse<Pin[]>>(
  //  path,
  //  method,
  //  authRequired,
  //  params,
  //  undefined,
  //  undefined,
  //);

  // 테스트를 위해 localStorage 사용
  const data = localStorage.getItem('pin');
  if (!data) return [];

  const res = { result: JSON.parse(data) as Pin[] } as ZipkokResponse<Pin[]>;
  return res;
};
