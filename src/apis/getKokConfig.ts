import api from '.';

import type { UserKokOption } from './getUserKokOption';
import type { ZipkokResponse } from 'types/ZipkokResponse';

export interface KokConfigResult {
  hilights: string[];
  checkedHilights: string[] | null;
  furnitureOptions: string[];
  checkedFurnitureOptions: string[] | null;
  reviewInfo: {
    impressions: string[];
    checkedImpressions: string[];
    facilityStarCount: number;
    infraStarCount: number;
    structureStarCount: number;
    vibeStarCount: number;
    reviewText: string;
  };
  outerOptions: UserKokOption[];
  innerOptions: UserKokOption[];
  contractOptions: UserKokOption[];
  outerImageUrls: string[];
  innerImageUrls: string[];
  contractImageUrls: string[];
}

/**
 * `GET /kok/config`
 * 새 콕리스트 작성 시 유저 설정 정보를 불러오는 API
 * @param number kokId
 */
export async function getKokConfig(kokId?: number) {
  const path = `/kok/config`;
  const method = 'GET';
  const params = kokId && { kokId };
  const authRequired = true;

  const res = await api<ZipkokResponse<KokConfigResult>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res;
}
