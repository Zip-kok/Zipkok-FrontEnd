import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Price.module.css';

import useRadioBtn from '../../../hooks/useRadioBtn';
import Monthly from './priceSlider/Monthly';
import Jeonse from './priceSlider/Jeonse';
import Purchase from './priceSlider/Purchase';
import BottomBtn from '../../../components/BottomBtn';

import { PriceType, PriceRange } from '../';

interface PriceProps {
  confirmPrice: (priceType: PriceType, priceRanges: PriceRange[]) => void;
}

export default function Price({ confirmPrice }: PriceProps) {
  const priceTypeOptions = [
    {
      value: '월세' as PriceType,
      content: '월세',
    },
    {
      value: '전세' as PriceType,
      content: '전세',
    },
    {
      value: '매매' as PriceType,
      content: '매매',
    },
  ];
  const [RadioBtnContainer, priceType] =
    useRadioBtn<PriceType>(priceTypeOptions);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

  const defaultValues: Record<PriceType, PriceRange[]> = {
    월세: [
      [0, 60_000_000],
      [0, 400_000],
    ],
    전세: [[0, 60_000_000]],
    매매: [[0, 120_000_000]],
  };

  const handleConfirmClick = () => {
    if (priceType !== undefined) confirmPrice(priceType, priceRanges);
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

      <RadioBtnContainer className={styles.priceTypeBtnContainer} />

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
