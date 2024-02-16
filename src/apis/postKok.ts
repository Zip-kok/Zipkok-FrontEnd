import api from 'apis';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { ZipkokResponse } from 'types/ZipkokResponse';
interface postRealEstateInfo {
  realEstateId: number;
}

/**
 * `POST /kok`으로 매물 등록을 요청합니다.
 */

export async function postKok(
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
  checkedOuterOptions: {
    optionId: number;
    checkedDetailOptionIds: number[];
  }[],
  checkedInnerOptions: {
    optionId: number;
    checkedDetailOptionIds: number[];
  }[],
  checkedContractOptions: {
    optionId: number;
    checkedDetailOptionIds: number[];
  }[],
) {
  const path = '/kok';
  const method = 'POST';
  const body = {};
  const authRequired = true;
  const res = await api<ZipkokResponse<postRealEstateInfo>>(
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
