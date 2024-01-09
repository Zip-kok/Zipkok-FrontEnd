import React, { useState } from 'react';

import styles from './Price.module.css';
import BottomBtn from '../../../components/BottomBtn';
import { useNavigate } from 'react-router-dom';

import Monthly from './priceSlider/Monthly';
import Jeonse from './priceSlider/Jeonse';
import Purchase from './priceSlider/Purchase';

import { PriceType, PriceRange } from '../';

interface PriceProps {
  confirmPrice: (priceType: PriceType, priceRanges: PriceRange[]) => void;
}

export default function Price({ confirmPrice }: PriceProps) {
  const [priceType, setPriceType] = useState<PriceType>(null);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

  const handleConfirmClick = () => {
    confirmPrice(priceType, priceRanges);
  };

  const handlePriceType = (priceType: PriceType) => {
    setPriceType(priceType);
  };

  const navigate = useNavigate();
  const handleSkipBtnClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          거래 유형에 따른
          <br />
          가격 범위를 설정해주세요
        </h1>
      </div>
      <div className={styles.priceTypeBtnContainer}>
        {(['월세', '전세', '매매'] as PriceType[]).map((type) => (
          <button
            key={type}
            className={priceType === type ? styles.activeButton : ''}
            onClick={() => handlePriceType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className={styles.priceSliderContainer}>
        {priceType === '월세' && (
          <Monthly onChange1={() => {}} onChange2={() => {}} />
        )}
        {priceType === '전세' && <Jeonse onChange={() => {}} />}
        {priceType === '매매' && <Purchase onChange={() => {}} />}
      </div>

      <BottomBtn
        onClick={handleConfirmClick}
        text="확인"
        onAnchorClick={handleSkipBtnClick}
        anchorText="나중에 설정하기"
      />
    </div>
  );
}
