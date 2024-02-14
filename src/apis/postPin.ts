import api from '.';

import type { Pin } from 'types/Pin';
import type { ZipkokResponse } from 'types/ZipkokResponse';

type PinWithoutId = Omit<Pin, 'id'>;

/**
 * `POST /pim`으로 핀 추가를 요청합니다.
 */
export const postPin = async (pin: PinWithoutId) => {
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
  const newId = Math.max(...pins.map((pin) => pin.id), 0) + 1;
  pins.push({ ...pin, id: newId });
  localStorage.setItem('pin', JSON.stringify(pins));

  const res = {} as ZipkokResponse<undefined>;
  return res;
};
