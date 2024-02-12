import api from '.';

import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface Option {
  optionId: number;
  optionTitle: string;
  orderNumber: number;
  isVisible: boolean;
  detailOptions: {
    detailOptionId: number;
    detailOptionTitle: string;
    detailOptionIsVisible: boolean;
  }[];
}

export interface UserKokOption {
  highlights: string[];
  outerOptions: Option[];
  innerOptions: Option[];
  contractOptions: Option[];
}
/**
 * `GET /user/kokOption`
 * 마이페이지의 리스트 항목 수정을 눌렀을 떄 호출되는 API
 export */
export async function getUserKokOption() {
  const path = '/user/kokOption';
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<UserKokOption>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res as ZipkokResponse<UserKokOption>;
}
