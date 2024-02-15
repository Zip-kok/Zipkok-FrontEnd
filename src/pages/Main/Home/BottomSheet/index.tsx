import React from 'react';

import HomeBottomSheet from './HomeBottomSheet/BottomSheet';
import { realEstateInfo } from '../KakaoMap';

interface BottomSheetProps {
  realEstateInfoList?: realEstateInfo[];
}
const BottomSheet = ({ realEstateInfoList }: BottomSheetProps) => {
  return (
    <div>
      <HomeBottomSheet realEstateInfoList={realEstateInfoList} />
    </div>
  );
};

export default BottomSheet;
