import type { HouseType } from 'types/HouseType';

/**
 * HouseType을 문자열로 변환합니다.
 * @param type HouseType
 * @returns 변환된 문자열
 */
export default function convertHouseTypeToString(type?: HouseType) {
  switch (type) {
    case 'APARTMENT':
      return '아파트';
    case 'OFFICETELL':
      return '오피스텔';
    case 'ONEROOM':
      return '원룸';
    case 'TWOROOM':
      return '빌라/투룸';
    default:
      return '';
  }
}
