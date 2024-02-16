import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomBtn } from 'components';
import useRadioBtn from 'hooks/useRadioBtn';

import styles from './Price.module.css';
import Jeonse from './priceSlider/Jeonse';
import Monthly from './priceSlider/Monthly';
import Purchase from './priceSlider/Purchase';

import type { PriceType } from 'types/PriceType';

type PriceRange = [number, number];

interface PriceProps {
  confirmPrice: (priceType: PriceType, priceRanges: PriceRange[]) => void;
  handleSkip: () => void;
}

export default function Price({ confirmPrice, handleSkip }: PriceProps) {
  const priceTypeOptions = [
    {
      value: 'MONTHLY' as PriceType,
      content: '월세',
    },
    {
      value: 'YEARLY' as PriceType,
      content: '전세',
    },
    {
      value: 'PURCHASE' as PriceType,
      content: '매매',
    },
  ];

  const [RadioBtnContainer, priceType] =
    useRadioBtn<PriceType>(priceTypeOptions);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

  useEffect(() => {
    if (priceType !== undefined) setPriceRanges(defaultValues[priceType]);
  }, [priceType]);

  const defaultValues: Record<PriceType, PriceRange[]> = {
    MONTHLY: [
      [0, 60_000_000],
      [0, 400_000],
    ],
    YEARLY: [[0, 60_000_000]],
    PURCHASE: [[0, 120_000_000]],
  };

  const handleConfirmClick = () => {
    if (priceType !== undefined) confirmPrice(priceType, priceRanges);
  };

  const navigate = useNavigate();

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
          {priceType === 'MONTHLY' && (
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

          {priceType === 'YEARLY' && (
            <Jeonse
              onChange={(rangeStart, rangeEnd) => {
                setPriceRanges([[rangeStart, rangeEnd]]);
              }}
              defaultValues={defaultValues[priceType]}
            />
          )}

          {priceType === 'PURCHASE' && (
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
        onAnchorClick={handleSkip}
        anchorText="나중에 설정하기"
        disabled={priceType === undefined}
        occupySpace
      />
    </div>
  );
}
