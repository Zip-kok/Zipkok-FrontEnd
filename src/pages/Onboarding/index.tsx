import React, { useState } from 'react';

import leftArrowIcon from 'assets/img/line(2)/left_arrow.svg';

import Complete from './Complete';
import Location from './Location';
import styles from './Onboarding.module.css';
import Price from './Price';
import Type from './Type';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

type Step = 'location' | 'type' | 'price' | 'complete';
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

  // 상단 바 및 뒤로 가기 버튼을 표시할지 여부
  function topBarEnabled(step: Step) {
    if (step === 'complete') {
      return false;
    } else {
      return true;
    }
  }

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
      {/* 상단 바 및 프로그레스 바 */}
      {topBarEnabled(step) && (
        <>
          <div className={styles.topBar}>
            <button className="imgBtn" onClick={handleBackClick}>
              <img src={leftArrowIcon}></img>
            </button>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      )}

      {/* 콘텐츠 */}
      <div
        className={`${styles.content} ${
          !topBarEnabled(step) ? styles.full : ''
        }`}
      >
        {steps[step]}
      </div>
    </div>
  );
}
