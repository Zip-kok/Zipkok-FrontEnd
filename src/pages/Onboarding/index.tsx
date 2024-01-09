import React, { useState } from 'react';
import styles from './Onboarding.module.css';

import Location from './Location';
import Price from './Price';
import Complete from './Complete';

import leftArrowIcon from '../../assets/img/left_arrow.svg';
import Type from './Type';

// location: 온보딩_01_거주지역
// type: 온보딩_02_매물종류
// price: 온보딩_03_가격범위
// complete: 온보딩_04_완료
type Step = 'location' | 'type' | 'price' | 'complete';
export type HouseType = '아파트' | '원룸' | '빌라/투룸' | '오피스텔' | null;
export type PriceType = '월세' | '전세' | '매매' | null;
export type PriceRange = [number, number];

export default function Onboarding() {
  const [step, setStep] = useState<Step>('location');
  const steps: Record<Step, JSX.Element> = {
    // location
    location: (
      <Location
        confirmLocation={(location: string) => {
          setStep('type');
        }}
      />
    ),

    // type
    type: (
      <Type
        confirmHouseType={(houseType: HouseType) => {
          setStep('price');
        }}
      />
    ),

    // price
    price: (
      <Price
        confirmPrice={(priceType: PriceType, priceRanges: PriceRange[]) => {
          setStep('complete');
        }}
      />
    ),

    // complete
    complete: <Complete />,
  };

  // 프로그레스바 가로 길이를 계산하기 위한 값
  const progresses: Record<Step, number> = {
    location: 0,
    type: 1,
    price: 2,
    complete: 3,
  };
  const progress = (progresses[step] / 3) * 100;

  // 뒤로 가기 버튼을 눌렀을 때
  function handleBackClick() {
    if (step === 'location') {
      return;
    } else if (step === 'type') {
      setStep('location');
    } else if (step === 'price') {
      setStep('type');
    } else if (step === 'complete') {
      setStep('price');
    }
  }

  return (
    <div>
      {step !== 'complete' && (
        <div className={styles.topBar}>
          <button className="imgBtn" onClick={handleBackClick}>
            <img src={leftArrowIcon}></img>
          </button>
        </div>
      )}
      {step !== 'complete' && (
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div
        className={`${styles.content} ${
          step === 'complete' ? styles.full : ''
        }`}
      >
        {steps[step]}
      </div>
    </div>
  );
}
