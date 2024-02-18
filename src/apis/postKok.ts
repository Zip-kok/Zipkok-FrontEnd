import api from 'apis';

import type { ZipkokResponse } from 'types/ZipkokResponse';
interface postKokInfo {
  kokid: number;
}

/**
 * `POST /kok`으로 매물 등록을 요청합니다.
 */

export async function postKok(
  realEstateId: number,
  checkedHighlights: string[],
  checkedFurnitureOptions: string[],
  direction: string,
  reviewInfo: {
    checkedImpressions: string[];
    facilityStarCount: number;
    infraStarCount: number;
    structureStarCount: number;
    vibeStarCount: number;
    reviewText: string;
  },
  checkedOuterOptions: [
    {
      optionId: number;
      checkedDetailOptionIds: number[];
    },
  ],
  checkedInnerOptions: [
    {
      optionId: number;
      checkedDetailOptionIds: number[];
    },
  ],
  checkedContractOptions: [
    {
      optionId: number;
      checkedDetailOptionIds: number[];
    },
  ],
) {
  const path = '/kok';
  const method = 'POST';
  const body = {
    realEstateId,
    checkedHighlights,
    checkedFurnitureOptions,
    direction,
    reviewInfo,
    checkedOuterOptions,
    checkedInnerOptions,
    checkedContractOptions,
  };
  const authRequired = true;
  const res = await api<ZipkokResponse<postKokInfo>>(
    path,
    method,
    authRequired,
    undefined,
    body,
    undefined,
  );

  return {
    res,
  };
}
