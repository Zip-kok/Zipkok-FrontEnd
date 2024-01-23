import { url } from 'constants/api';

import { ZipkokResponse } from 'types/ZipkokResponse';

interface SearchAddressResult {
  documents: {
    address_name: string;
    x: number;
    y: number;
  }[];
  meta: {
    end: boolean;
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

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
