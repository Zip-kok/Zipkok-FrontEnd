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
 * 최근 본 매물 목록에 매물을 추가하는 함수
 */
export default function pushToRecents(recent: Recent) {
  const recents = JSON.parse(
    localStorage.getItem('recents') || '[]',
  ) as Recent[];

  const index = recents.findIndex(
    (r) => r.realEstateId === recent.realEstateId,
  );

  if (index === -1) {
    recents.push(recent);
  } else {
    recents.splice(index, 1);
    recents.push(recent);
  }

  if (recents.length > 10) {
    recents.shift();
  }

  localStorage.setItem('recents', JSON.stringify(recents));
}
