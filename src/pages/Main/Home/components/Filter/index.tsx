import React, { useState } from 'react';

import useRadioBtn from 'hooks/useRadioBtn';
import Jeonse from 'pages/Onboarding/Price/priceSlider/Jeonse';
import Monthly from 'pages/Onboarding/Price/priceSlider/Monthly';
import Purchase from 'pages/Onboarding/Price/priceSlider/Purchase';

import styles from './Filter.module.css';
import { Gender } from '../../../../SignIn';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

type PriceRange = [number, number];

export default function Filter() {
  const defaultValues: Record<PriceType, PriceRange[]> = {
    월세: [
      [0, 60_000_000],
      [0, 400_000],
    ],
    전세: [[0, 60_000_000]],
    매매: [[0, 120_000_000]],
  };

  // 집 형태 라디오 버튼
  const houseTypeOptions: { value: HouseType; content: string }[] = [
    { value: '원룸', content: '원룸' },
    { value: '오피스텔', content: '오피스텔' },
    { value: '아파트', content: '아파트' },
    { value: '빌라/투룸', content: '빌라/투룸' },
  ];
  const [HouseTypeRadioBtnContainer, houseType] = useRadioBtn<HouseType>(
    houseTypeOptions,
    'tag',
    '원룸',
  );

  // 가격 타입 라디오 버튼
  const priceTypeOptions: { value: PriceType; content: string }[] = [
    { value: '월세', content: '월세' },
    { value: '전세', content: '전세' },
    { value: '매매', content: '매매' },
  ];
  const [PriceTypeRadioBtnContainer, priceType] = useRadioBtn<PriceType>(
    priceTypeOptions,
    'tag',
    '월세',
  );

  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

  return (
    <div className={styles.root}>
      {/* 필터 설정 */}
      <div className={styles.container}>
        <h1 className={styles.title}>필터 설정</h1>

        <div className={styles.filterContainers}>
          {/* 가격 타입 */}
          <PriceTypeRadioBtnContainer className={styles.filterContainer} />

          {/* 집 타입 */}
          <HouseTypeRadioBtnContainer className={styles.filterContainer} />
        </div>

        {/* 가격 설정 */}
        <div className={styles.container}>
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
    </div>
  );
}
