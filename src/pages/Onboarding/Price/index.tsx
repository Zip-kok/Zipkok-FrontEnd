import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Price.module.css';

import Monthly from './priceSlider/Monthly';
import Jeonse from './priceSlider/Jeonse';
import Purchase from './priceSlider/Purchase';
import BottomBtn from '../../../components/BottomBtn';
import RadioBtn from '../../../components/RadioBtn';

import { PriceType, PriceRange } from '../';

interface PriceProps {
  confirmPrice: (priceType: PriceType, priceRanges: PriceRange[]) => void;
}

export default function Price({ confirmPrice }: PriceProps) {
  const [priceType, setPriceType] = useState<PriceType>(null);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

  const priceTypeOptions = ['월세', '전세', '매매'] as Exclude<
    PriceType,
    null
  >[];
  const defaultValues: Record<Exclude<PriceType, null>, PriceRange[]> = {
    월세: [
      [0, 60_000_000],
      [0, 400_000],
    ],
    전세: [[0, 60_000_000]],
    매매: [[0, 120_000_000]],
  };

  const handleConfirmClick = () => {
    confirmPrice(priceType, priceRanges);
  };

  const handlePriceType = (priceType: PriceType) => {
    if (priceType !== null) setPriceRanges(defaultValues[priceType]);
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
      <ul className={styles.priceTypeBtnContainer}>
        {priceTypeOptions.map((type) => (
          <RadioBtn
            key={type}
            content={type}
            isSelected={priceType === type}
            handleClick={() => handlePriceType(type)}
          />
        ))}
      </ul>

      <div className={styles.priceSliderContainer}>
        <div>
          {priceType === '월세' && (
            <Monthly
              onChange1={(rangeStart, rangeEnd) => {
                setPriceRanges((prev) => [[rangeStart, rangeEnd], prev[1]]);
              }}
              onChange2={(rangeStart, rangeEnd) => {
                setPriceRanges((prev) => [prev[0], [rangeStart, rangeEnd]]);
              }}
              defaultValues={defaultValues[priceType]}
            />
          )}

          {priceType === '전세' && (
            <Jeonse
              onChange={(rangeStart, rangeEnd) => {
                setPriceRanges([[rangeStart, rangeEnd]]);
              }}
              defaultValues={defaultValues[priceType]}
            />
          )}

          {priceType === '매매' && (
            <Purchase
              onChange={(rangeStart, rangeEnd) => {
                setPriceRanges([[rangeStart, rangeEnd]]);
              }}
              defaultValues={defaultValues[priceType]}
            />
          )}
        </div>
      </div>

      <BottomBtn
        onClick={handleConfirmClick}
        text="확인"
        onAnchorClick={handleSkipBtnClick}
        anchorText="나중에 설정하기"
        disabled={priceType === null}
      />
    </div>
  );
}
