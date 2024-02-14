import api from '.';

import type { Pin } from 'types/Pin';
import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `GET /pin`으로 핀 정보를 요청합니다.
 * @param pinId 핀 ID (전달하지 않으면 모든 핀 목록을 가져옵니다.)
 */
export const getPin = async (pinId?: number) => {
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
  const data = localStorage.getItem('pin') ?? '[]';

  if (pinId === undefined) {
    const res = { result: JSON.parse(data) as Pin[] } as ZipkokResponse<Pin[]>;
    return res;
  } else {
    const res = {
      result: JSON.parse(data).find((pin: Pin) => pin.id === pinId),
    } as ZipkokResponse<Pin>;
    return res;
  }
};
