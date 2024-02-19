import Cookies from 'js-cookie';
import storeNewTokensToCookie from 'utils/storeNewTokensToCookie';

import type { ZipkokResponse } from 'types/ZipkokResponse';

/**
 * `PUT /kok`으로 매물 수정을 요청합니다.
 */

interface PutKokRequest {
  kokId: number;
  checkedHighlights: string[];
  checkedFurnitureOptions: string[];
  direction: string;
  reviewInfo: {
    checkedImpressions: string[];
    facilityStarCount: number;
    infraStarCount: number;
    structureStarCount: number;
    vibeStarCount: number;
    reviewText: string;
  };
  checkedOuterOptions: {
    optionId: number;
    checkedDetailOptionIds: number[];
  }[];
  checkedInnerOptions: {
    optionId: number;
    checkedDetailOptionIds: number[];
  }[];
  checkedContractOptions: {
    optionId: number;
    checkedDetailOptionIds: number[];
  }[];
  files: File[];
}

export async function putKok(data: Partial<PutKokRequest>) {
  const formData = new FormData();
  data.files?.forEach((file) => formData.append('file', file, file.name));
  formData.append(
    'data',
    new Blob(
      [
        JSON.stringify({
          kokId: data.kokId,
          checkedHighlights: data.checkedHighlights,
          checkedFurnitureOptions: data.checkedFurnitureOptions,
          direction: data.direction,
          reviewInfo: data.reviewInfo,
          checkedOuterOptions: data.checkedOuterOptions,
          checkedInnerOptions: data.checkedInnerOptions,
          checkedContractOptions: data.checkedContractOptions,
        }),
      ],
      {
        type: 'application/json',
      },
    ),
  );

  let accessToken = Cookies.get('accessToken');

  // access token 만료 시
  if (accessToken === undefined) {
    accessToken = await storeNewTokensToCookie().then((res) => {
      if (res === null) throw new Error('로그인이 필요합니다.');
      return res.accessToken;
    });
  }

  const res = (await fetch('https://zipkok.shop/kok', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  }).then((res) => res.json())) as ZipkokResponse<undefined>;
  return res;
}
