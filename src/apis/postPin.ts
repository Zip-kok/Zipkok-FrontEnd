import api from '.';

import type { Pin } from 'types/Pin';
import type { ZipkokResponse } from 'types/ZipkokResponse';

type PinWithoutId = Omit<Pin, 'id'>;

/**
 * `POST /pin`으로 핀 추가를 요청합니다.
 */
export const postPin = async (pin: PinWithoutId) => {
  const path = `/pin`;
  const method = 'POST';
  const body = {
    ...pin,
  };
  const authRequired = true;
  const res = await api<ZipkokResponse<undefined>>(
    path,
    method,
    authRequired,
    undefined,
    body,
    undefined,
  );
  return res;
};
