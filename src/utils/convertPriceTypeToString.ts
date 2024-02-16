import type { PriceType } from 'types/PriceType';

/**
 * PriceType을 문자열로 변환합니다.
 * @param type PriceType
 * @returns 변환된 문자열
 */
export default function convertPriceTypeToString(type?: PriceType) {
  switch (type) {
    case 'MONTHLY':
      return '월세';
    case 'YEARLY':
      return '전세';
    case 'PURCHASE':
      return '매매';
    default:
      return '';
  }
}
