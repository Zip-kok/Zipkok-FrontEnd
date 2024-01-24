import React, { useState } from 'react';

import { onBoarding } from 'apis';
import leftArrowIcon from 'assets/img/line(2)/left_arrow.svg';
import { StatusCode } from 'types/StatusCode';

import Complete from './Complete';
import Location from './Location';
import styles from './Onboarding.module.css';
import Price from './Price';
import Type from './Type';

import type { Address } from 'types/Address';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

type Step = 'location' | 'type' | 'price' | 'complete';
export type PriceRange = [number, number];

export default function Onboarding() {
  const [step, setStep] = useState<Step>('location');

  const [location, setLocation] = useState<Address>();
  const [houseType, setHouseType] = useState<HouseType>('원룸');
  const [priceType, setPriceType] = useState<PriceType>('월세');
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);

  const steps: Record<Step, JSX.Element> = {
    // location
    location: (
      <Location
        confirmLocation={(location: Address) => {
          setLocation(location);
          setStep('type');
        }}
      />
    ),

    // type
    type: (
      <Type
        confirmHouseType={(houseType: HouseType) => {
          setHouseType(houseType);
          setStep('price');
        }}
      />
    ),

    // price
    price: (
      <Price
        confirmPrice={(priceType: PriceType, priceRanges: PriceRange[]) => {
          setPriceType(priceType);
          setPriceRanges(priceRanges);
          handleFinalSubmit();
        }}
      />
    ),

    // complete
    complete: <Complete />,
  };

  // 서버에 최종 데이터 전송
  function handleFinalSubmit() {
    let mpriceMin = 0,
      mpriceMax = 0,
      mdepositMin = 0,
      mdepositMax = 0,
      ydepositMin = 0,
      ydepositMax = 0,
      purchaseMin = 0,
      purchaseMax = 0;

    switch (priceType) {
      case '월세':
        mdepositMin = priceRanges[0][0];
        mdepositMax = priceRanges[0][1];
        mpriceMin = priceRanges[1][0];
        mpriceMax = priceRanges[1][1];
        break;
      case '전세':
        ydepositMin = priceRanges[0][0];
        ydepositMax = priceRanges[0][1];
        break;
      case '매매':
        purchaseMin = priceRanges[0][0];
        purchaseMax = priceRanges[0][1];
        break;
    }

    if (location === undefined) return;

    // TODO: add lat, lng
    onBoarding(
      location.address_name,
      location.y,
      location.x,
      houseType,
      mpriceMin,
      mpriceMax,
      mdepositMin,
      mdepositMax,
      ydepositMin,
      ydepositMax,
      purchaseMin,
      purchaseMax,
    )
      .then((res) => {
        switch (res.code) {
          // 회원정보 등록/수정 성공
          case StatusCode.MEMBER_INFO_UPDATE_SUCCESS:
            setStep('complete');
            break;
          // 주소가 없거나 최대 입력 범위 초과
          case StatusCode.ADDRESS_OVER_LENGTH:
            setStep('location');
            break;
          // 위도, 경도가 없거나 범위 초과
          case StatusCode.INVALID_LAT_LNG:
            setStep('location');
            break;
          // 최소 가격이 없거나 0 이하
          case StatusCode.INVALID_MIN_PRICE:
            setStep('price');
            break;
          // 최대 가격이 없거나 0 이하
          case StatusCode.INVALID_MAX_PRICE:
            setStep('price');
            break;
          // 관심매물유형 오류
          case StatusCode.INVALID_INTEREST_TYPE:
            setStep('type');
            break;
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

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
