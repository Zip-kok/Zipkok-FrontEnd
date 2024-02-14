import api from './';

import type { UserKokOption } from './getUserKokOption';
import type { ZipkokResponse } from 'types/ZipkokResponse';

interface KokOption<T> {
  highlights: string[];
  outerOptions: T[];
  innerOptions: T[];
  contractOptions: T[];
}

/**
 * 온보딩 페이지에서 입력한 모든 정보를 `PUT /user/kokOption`으로 전송합니다.
 */
export default async function putUserKokOption(
  kokOption: KokOption<UserKokOption>,
) {
  const path = '/user/kokOption';
  const method = 'PUT';
  const body = kokOption;
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
}
