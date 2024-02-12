import api from './';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface KokReview {
  impressions: [string];
  facilityStarCount: number;
  infraStarCount: number;
  structureStarCount: number;
  vibeStarCount: number;
  reviewText: string;
}

/**
 * `GET /kok/{kokId}/review`
 * 콕리스트_작성한리스트 확인 (5가지 항목) 에서 “후기” 탭 클릭시 호출되는 API
 * 콕의 후기 정보 반환
 */
export async function getKokReview() {
  const path = '/kok/${kokId}/review';
  const method = 'GET';
  const params = {};
  const authRequired = true;

  const res = await api<ZipkokResponse<KokReview>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res as ZipkokResponse<KokReview>;
}
