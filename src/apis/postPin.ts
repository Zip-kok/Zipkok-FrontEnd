import api from '.';

import type { Pin } from 'types/Pin';
import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `POST /pim`으로 핀 추가를 요청합니다.
 */
export const postPin = async (pin: Pin) => {
  //const path = `/pin`;
  //const method = 'POST';
  //const body = {
  //  pin,
  //};
  //const authRequired = true;

  //const res = await api<ZipkokResponse<undefined>>(
  //  path,
  //  method,
  //  authRequired,
  //  undefined,
  //  body,
  //  undefined,
  //);

  // 테스트를 위해 localStorage 사용
  const data = localStorage.getItem('pin') ?? '[]';
  const pins = JSON.parse(data) as Pin[];
  pins.push(pin);
  localStorage.setItem('pin', JSON.stringify(pins));

  const res = {} as ZipkokResponse<undefined>;
  return res;
};
