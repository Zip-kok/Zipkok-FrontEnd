import api from '.';

import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface UserKokOption {
  highlights: string[];
  outerOptions: [
    {
      optionId: number;
      optionTitle: string;
      orderNumber: number;
      isVisible: boolean;
      detailOptions: {
        detailOptionId: number;
        detailOptionTitle: string;
        detailOptionIsVisible: boolean;
      };
    },
  ];
  innerOptions: [
    {
      optionId: number;
      optionTitle: string;
      orderNumber: number;
      isVisible: boolean;
      detailOptions: {
        detailOptionId: number;
        detailOptionTitle: string;
        detailOptionIsVisible: boolean;
      };
    },
  ];
  contractOptions: [
    {
      optionId: number;
      optionTitle: string;
      orderNumber: number;
      isVisible: boolean;
      detailOptions: {
        detailOptionId: number;
        detailOptionTitle: string;
        detailOptionIsVisible: boolean;
      };
    },
  ];
}
/**
 * `GET /user/kokOption`
 * 마이페이지의 리스트 항목 수정을 눌렀을 떄 호출되는 API
 */
export async function getUserKokOption(kokId: number) {
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
