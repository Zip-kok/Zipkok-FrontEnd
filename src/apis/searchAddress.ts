import { url } from 'constants/api';

import { ZipkokResponse } from 'types/ZipkokResponse';
import { Address } from 'types/Address';

interface SearchAddressResult {
  documents: Address[];
  meta: {
    end: boolean;
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

/**
 * `GET /address`로 주소 검색을 요청합니다.
 */
export async function searchAddress(query: string, page = 1, size = 50) {
  const params = {
    query: query,
    page: page.toString(),
    size: size.toString(),
  };
  const paramStr = new URLSearchParams(params).toString();

  const res = await fetch(`${url}/address?${paramStr}`);
  const data = (await res.json()) as ZipkokResponse<SearchAddressResult>;
  return data;
}
