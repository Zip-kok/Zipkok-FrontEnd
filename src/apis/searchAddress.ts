import api from './';

import type { Address } from 'types/Address';
import type { ZipkokResponse } from 'types/ZipkokResponse';

interface RawAddress {
  address_name: string;
  x: string;
  y: string;
}

interface SearchAddressResult<T> {
  documents: T[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

/**
 * `GET /address`로 주소 검색을 요청합니다.
 */
export async function searchAddress(query: string, page = 1, size = 30) {
  const path = '/address';
  const method = 'GET';
  const params = {
    query: query,
    page: page.toString(),
    size: size.toString(),
  };
  const authRequired = false;

  const res = await api<ZipkokResponse<SearchAddressResult<RawAddress>>>(
    path,
    method,
    authRequired,
    params,
    undefined,
    undefined,
  );

  return {
    ...res,
    result: {
      ...res.result,
      documents: res.result.documents.map((address) => ({
        ...address,
        x: Number(address.x),
        y: Number(address.y),
      })),
    },
  } as ZipkokResponse<SearchAddressResult<Address>>;
}
