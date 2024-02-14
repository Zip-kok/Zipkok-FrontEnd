import React from 'react';

import HomeBottomSheet from './HomeBottomSheet/BottomSheet';
import { realEstateInfoList } from '../KakaoMap';

interface BottomSheetProps {
  realEstateInfoList?: realEstateInfoList[];
}
const BottomSheet = ({ realEstateInfoList }: BottomSheetProps) => {
  return (
    <div>
      <HomeBottomSheet realEstateInfoList={realEstateInfoList} />
    </div>
  );
};

export default BottomSheet;
