import api from '.';

import type { Pin } from 'types/Pin';
import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `DELETE /pin`으로 핀 삭제를 요청합니다.
 */
export const deletePin = async (pinId: number) => {
  const path = `/pin`;
  const method = 'DELETE';
  const body = {
    id: pinId,
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
