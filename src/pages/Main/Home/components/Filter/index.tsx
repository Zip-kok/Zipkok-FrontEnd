import React, { useState } from 'react';

import BottomBtn from 'components/BottomBtn';
import useMyPageStore from 'contexts/useMyPageStore';
import useRadioBtn from 'hooks/useRadioBtn';
import Jeonse from 'pages/Onboarding/Price/priceSlider/Jeonse';
import Monthly from 'pages/Onboarding/Price/priceSlider/Monthly';
import Purchase from 'pages/Onboarding/Price/priceSlider/Purchase';

import styles from './Filter.module.css';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

type PriceRange = [number, number];

interface FilterProps {
  setFilterOpen: (value: boolean) => void;
}

export default function Filter(props: FilterProps) {
  const { setFilterOpen } = props;
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
    setMPriceMin,
    setMPriceMax,
    setMDepositMax,
    setMDepositMin,
    setYDepositMin,
    setYDepositMax,
    setPriceMin,
    setPriceMax,
  } = useMyPageStore();

  const handelSaveBtnClick = () => {
    if (houseType === undefined || priceType === undefined) return;

    setRealEstateType(houseType);
    setTransactionType(priceType);

    if (priceType === '월세') {
      // 월세의 경우, 첫 번째 배열 요소는 보증금 범위, 두 번째는 월세 범위
      const [depositRange, monthlyRange] = priceRanges;
      setMDepositMin(depositRange[0]);
      setMDepositMax(depositRange[1]);
      setMPriceMin(monthlyRange[0]);
      setMPriceMax(monthlyRange[1]);

      setYDepositMin(undefined);
      setYDepositMax(undefined);
      setYDepositMin(undefined);
      setYDepositMax(undefined);
    } else if (priceType === '전세') {
      // 전세의 경우, 보증금 범위만
      const [depositRange] = priceRanges;
      setYDepositMin(depositRange[0]);
      setYDepositMax(depositRange[1]);

      setMDepositMin(undefined);
      setMDepositMax(undefined);
      setMPriceMin(undefined);
      setMPriceMax(undefined);
      setPriceMin(undefined);
      setPriceMax(undefined);
    } else if (priceType === '매매') {
      // 매매의 경우, 가격 범위만
      const [purchaseRange] = priceRanges;
      setPriceMin(purchaseRange[0]);
      setPriceMax(purchaseRange[1]);

      setYDepositMin(undefined);
      setYDepositMax(undefined);
      setMDepositMin(undefined);
      setMDepositMax(undefined);
      setMPriceMin(undefined);
      setMPriceMax(undefined);
    }

    // 저장하면 필터 내리기
    setFilterOpen(false);
  };

  return (
    <div className={styles.root}>
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
