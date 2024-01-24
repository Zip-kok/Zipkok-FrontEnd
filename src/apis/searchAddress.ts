import { url } from 'constants/api';

import api from './';

import type { Address } from 'types/Address';
import type { ZipkokResponse } from 'types/ZipkokResponse';

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
  const path = '/address';
  const method = 'GET';
  const params = {
    query: query,
    page: page.toString(),
    size: size.toString(),
  };
  const authRequired = false;

  const res = await api<ZipkokResponse<SearchAddressResult>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return res;
}
