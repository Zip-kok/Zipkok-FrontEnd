import api from '.';

import type { Pin } from 'types/Pin';
import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `DELETE /pin`으로 핀 삭제를 요청합니다.
 */
export const deletePin = async (pinId: number) => {
  //const path = `/pin`;
  //const method = 'DELETE';
  //const body = {
  //  pinId,
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
  const newPins = pins.filter((pin) => pin.id !== pinId);
  localStorage.setItem('pin', JSON.stringify(newPins));

  const res = {} as ZipkokResponse<undefined>;
  return res;
};
