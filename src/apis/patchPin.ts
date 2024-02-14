import api from '.';

import type { Pin } from 'types/Pin';
import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `PATCH /pin`으로 핀 수정을 요청합니다.
 */
export const patchPin = async (pin: Pin) => {
  //const path = `/pin`;
  //const method = 'PATCH';
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
  const index = pins.findIndex((p) => p.id === pin.id);
  pins[index] = pin;
  localStorage.setItem('pin', JSON.stringify(pins));

  const res = {} as ZipkokResponse<undefined>;
  return res;
};
