import type { PriceType } from 'types/PriceType';

interface Recent {
  realEstateId: number;
  like: boolean;
  type: string;
  priceType: PriceType;
  deposit: number;
  price: number;
  address: string;
  propertyName: string;
  imageUrl: string | null;
  kokList: boolean;
}

/*
 * 최근 본 매물 목록을 가져오는 함수
 */
export default function getRecents() {
  const recents = JSON.parse(
    localStorage.getItem('recents') || '[]',
  ) as Recent[];
  return recents;
}
