import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { onBoarding } from 'apis';
import leftArrowIcon from 'assets/img/line(2)/left_arrow.svg';
import useModalStore from 'contexts/modalStore';
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
  const navigate = useNavigate();
  const modalStore = useModalStore();

  function handleSkip() {
    modalStore
      .open({
        title: '홈 화면으로 이동하시겠어요?',
        description:
          '마이페이지 > 프로필 수정하기에서 이어서 설정할 수 있습니다.',
        primaryButton: '이동하기',
        secondaryButton: '계속하기',
      })
      .then((res) => {
        if (res === 'primary') navigate('/');
      });
  }

  const [step, setStep] = useState<Step>('location');

  const [location, setLocation] = useState<Address>({
    address_name: '',
    x: 0,
    y: 0,
  });
  const [houseType, setHouseType] = useState<HouseType>('원룸');
  const [, setPriceType] = useState<PriceType>('월세');
  const [, setPriceRanges] = useState<PriceRange[]>([]);

  const steps: Record<Step, JSX.Element> = {
    // location
    location: (
      <Location
        confirmLocation={(location: Address) => {
          setLocation(location);
          setStep('type');
        }}
        handleSkip={handleSkip}
      />
    ),

    // type
    type: (
      <Type
        confirmHouseType={(houseType: HouseType) => {
          setHouseType(houseType);
          setStep('price');
        }}
        handleSkip={handleSkip}
      />
    ),

    // price
    price: (
      <Price
        confirmPrice={(priceType: PriceType, priceRanges: PriceRange[]) => {
          setPriceType(priceType);
          setPriceRanges(priceRanges);
          handleFinalSubmit(location, houseType, priceType, priceRanges);
        }}
        handleSkip={handleSkip}
      />
    ),

    // complete
    complete: <Complete />,
  };

  // 서버에 최종 데이터 전송
  const handleFinalSubmit = useCallback(
    (
      location: Address,
      houseType: HouseType,
      priceType: PriceType,
      priceRanges: PriceRange[],
    ) => {
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
          // 회원정보 등록/수정 성공
          if (res.code === StatusCode.MEMBER_INFO_UPDATE_SUCCESS) {
            setStep('complete');
          } else {
            let isDefinedError = false;
            let errorStep: Step;
            switch (res.code) {
              // 주소가 없거나 최대 입력 범위 초과
              case StatusCode.ADDRESS_OVER_LENGTH:
                isDefinedError = true;
                errorStep = 'location';
                break;
              // 위도, 경도가 없거나 범위 초과
              case StatusCode.INVALID_LAT_LNG:
                isDefinedError = true;
                errorStep = 'location';
                break;
              // 최소 가격이 없거나 0 이하
              case StatusCode.INVALID_MIN_PRICE:
                isDefinedError = true;
                errorStep = 'price';
                break;
              // 최대 가격이 없거나 0 이하
              case StatusCode.INVALID_MAX_PRICE:
                isDefinedError = true;
                errorStep = 'price';
                break;
              // 관심매물유형 오류
              case StatusCode.INVALID_INTEREST_TYPE:
                isDefinedError = true;
                errorStep = 'type';
                break;
            }

            if (isDefinedError) {
              modalStore
                .open({
                  title: '올바르지 않은 값이 있어요.',
                  description: res.message,
                  primaryButton: '다시 설정하기',
                  secondaryButton: '나중에 설정하기',
                })
                .then((res) => {
                  if (res === 'primary') setStep(errorStep);
                  else navigate('/');
                });
            } else {
              modalStore
                .open({
                  title: '오류가 발생했어요.',
                  description: res.message,
                  primaryButton: '나중에 설정하기',
                })
                .then((res) => {
                  if (res === 'primary') navigate('/');
                });
            }
          }
        })
        .catch((err) => {
          modalStore
            .open({
              title: '오류가 발생했어요.',
              description: err.message,
              primaryButton: '나중에 설정하기',
            })
            .then((res) => {
              if (res === 'primary') navigate('/');
            });
        });
    },
    [],
  );

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
