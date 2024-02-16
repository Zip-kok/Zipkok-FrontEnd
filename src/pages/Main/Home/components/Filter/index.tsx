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
  selectedHouseType?: HouseType;
  selectedPriceType?: PriceType;
  prices: {
    mprice: PriceRange;
    mdeposit: PriceRange;
    ydeposit: PriceRange;
    price: PriceRange;
  };
}

export default function Filter({
  setFilterOpen,
  selectedHouseType,
  selectedPriceType,
  prices,
}: FilterProps) {
  const defaultValues: Record<PriceType, PriceRange[]> = {
    MONTHLY: [
      [0, 60_000_000],
      [0, 400_000],
    ],
    YEARLY: [[0, 60_000_000]],
    PURCHASE: [[0, 120_000_000]],
  };

  // 집 형태 라디오 버튼
  const houseTypeOptions: { value: HouseType; content: string }[] = [
    { value: 'ONEROOM', content: '원룸' },
    { value: 'OFFICETELL', content: '오피스텔' },
    { value: 'APARTMENT', content: '아파트' },
    { value: 'TWOROOM', content: '빌라/투룸' },
  ];
  const [HouseTypeRadioBtnContainer, houseType] = useRadioBtn<HouseType>(
    houseTypeOptions,
    'tag',
    selectedHouseType ?? 'ONEROOM',
  );
  // 가격 타입 라디오 버튼
  const priceTypeOptions: { value: PriceType; content: string }[] = [
    { value: 'MONTHLY', content: '월세' },
    { value: 'YEARLY', content: '전세' },
    { value: 'PURCHASE', content: '매매' },
  ];
  const [PriceTypeRadioBtnContainer, priceType] = useRadioBtn<PriceType>(
    priceTypeOptions,
    'tag',
    selectedPriceType ?? 'MONTHLY',
  );

  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([
    [0, 60_000_000],
    [0, 400_000],
  ]);
  const MyPageStore = useMyPageStore((store) => store);

  const handelSaveBtnClick = () => {
    if (houseType === undefined || priceType === undefined) return;

    MyPageStore.setRealEstateType(houseType);
    MyPageStore.setTransactionType(priceType);

    if (priceType === 'MONTHLY') {
      // 월세의 경우, 첫 번째 배열 요소는 보증금 범위, 두 번째는 월세 범위
      const [depositRange, monthlyRange] = priceRanges;
      MyPageStore.setMDepositMin(depositRange[0]);
      MyPageStore.setMDepositMax(depositRange[1]);
      MyPageStore.setMPriceMin(monthlyRange[0]);
      MyPageStore.setMPriceMax(monthlyRange[1]);

      MyPageStore.setYDepositMin(undefined);
      MyPageStore.setYDepositMax(undefined);
      MyPageStore.setYDepositMin(undefined);
      MyPageStore.setYDepositMax(undefined);
    } else if (priceType === 'YEARLY') {
      // 전세의 경우, 보증금 범위만
      const [depositRange] = priceRanges;
      MyPageStore.setYDepositMin(depositRange[0]);
      MyPageStore.setYDepositMax(depositRange[1]);

      MyPageStore.setMDepositMin(undefined);
      MyPageStore.setMDepositMax(undefined);
      MyPageStore.setMPriceMin(undefined);
      MyPageStore.setMPriceMax(undefined);
      MyPageStore.setPriceMin(undefined);
      MyPageStore.setPriceMax(undefined);
    } else if (priceType === 'PURCHASE') {
      // 매매의 경우, 가격 범위만
      const [purchaseRange] = priceRanges;
      MyPageStore.setPriceMin(purchaseRange[0]);
      MyPageStore.setPriceMax(purchaseRange[1]);

      MyPageStore.setYDepositMin(undefined);
      MyPageStore.setYDepositMax(undefined);
      MyPageStore.setMDepositMin(undefined);
      MyPageStore.setMDepositMax(undefined);
      MyPageStore.setMPriceMin(undefined);
      MyPageStore.setMPriceMax(undefined);
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
          {priceType === 'MONTHLY' && (
            <Monthly
              onChange1={(rangeStart, rangeEnd) => {
                setPriceRanges((prev) => [[rangeStart, rangeEnd], prev[1]]);
              }}
              onChange2={(rangeStart, rangeEnd) => {
                setPriceRanges((prev) => [prev[0], [rangeStart, rangeEnd]]);
              }}
              defaultValues={[prices.mdeposit, prices.mprice]}
            />
          )}

          {priceType === 'YEARLY' && (
            <Jeonse
              onChange={(rangeStart, rangeEnd) => {
                setPriceRanges([[rangeStart, rangeEnd]]);
              }}
              defaultValues={[prices.ydeposit]}
            />
          )}

          {priceType === 'PURCHASE' && (
            <Purchase
              onChange={(rangeStart, rangeEnd) => {
                setPriceRanges([[rangeStart, rangeEnd]]);
              }}
              defaultValues={[prices.price]}
            />
          )}
        </div>
      </div>
      <div style={{ height: '70px' }}></div>
      <BottomBtn text="저장" onClick={handelSaveBtnClick} />
    </div>
  );
}
