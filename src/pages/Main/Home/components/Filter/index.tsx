import React, { useState } from 'react';

import BottomBtn from 'components/BottomBtn';
import useMyPageStore from 'contexts/useMyPageStore';
import useRadioBtn from 'hooks/useRadioBtn';
import Jeonse from 'pages/Onboarding/Price/priceSlider/Jeonse';
import Monthly from 'pages/Onboarding/Price/priceSlider/Monthly';
import Purchase from 'pages/Onboarding/Price/priceSlider/Purchase';

import styles from './Filter.module.css';
import { Gender } from '../../../../SignIn';
import BottomSheetHeader from '../../BottomSheet/HomeBottomSheet/BottomSheetHeader';

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
  const {
    setRealEstateType,
    setTransactionType,
    setPriceMax,
    setDepositMax,
    setPriceMin,
    setDepositMin,
  } = useMyPageStore();

  const handelSaveBtnClick = () => {
    setRealEstateType(houseType!);
    setTransactionType(priceType!);

    // 가격 범위를 업데이트합니다.
    // 가격 유형에 따라 최대/최소 가격과 보증금을 다르게 설정합니다.
    if (priceType === '월세') {
      // 월세의 경우, 첫 번째 배열 요소는 보증금 범위, 두 번째는 월세 범위입니다.
      const [depositRange, monthlyRange] = priceRanges;
      setDepositMin(depositRange[0]);
      setDepositMax(depositRange[1]);
      setPriceMin(monthlyRange[0]);
      setPriceMax(monthlyRange[1]);
    } else if (priceType === '전세') {
      // 전세의 경우, 보증금 범위만 설정합니다.
      const [depositRange] = priceRanges;
      setDepositMin(depositRange[0]);
      setDepositMax(depositRange[1]);
      // 전세는 월세가 없으므로 가격을 0으로 설정할 수 있습니다.
      setPriceMin(0);
      setPriceMax(0);
    } else if (priceType === '매매') {
      // 매매의 경우, 가격 범위만 설정합니다.
      const [purchaseRange] = priceRanges;
      setPriceMin(purchaseRange[0]);
      setPriceMax(purchaseRange[1]);
      // 매매는 보증금이 없으므로 보증금을 0으로 설정할 수 있습니다.
      setDepositMin(0);
      setDepositMax(0);
    }
  };

  return (
    <div className={styles.root}>
      {/* 바텀시트 헤더 */}
      <BottomSheetHeader />
      {/* 바텀 시트 Content */}
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
        <div className={styles.priceContainer}>
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
      <div style={{ height: '70px' }}></div>
      <BottomBtn text="저장" onClick={handelSaveBtnClick} />
    </div>
  );
}
