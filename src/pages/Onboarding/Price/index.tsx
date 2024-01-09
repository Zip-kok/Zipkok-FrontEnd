import React, { useState } from 'react';

import styles from './Price.module.css';
import BottomBtn from '../../../components/BottomBtn';
import { useNavigate } from 'react-router-dom';

import Monthly from './priceSlider/Monthly';
import Jeonse from './priceSlider/Jeonse';
import Purchase from './priceSlider/Purchase';

interface PriceProps {
  confirmPrice: (Price: string) => void;
}
// 보증금 최솟값, 최댓값, 1칸당 크기
const depositMinPrice: number = 0;
const depositMaxPrice: number = 10000;
const depositPriceGap: number = 100;

// 월세 최솟값, 최댓값, 1칸당 크기
const rentMinPrice: number = 0;
const rentMaxPrice: number = 100;
const rentPriceGap: number = 1;

// 매매가 최솟값, 최댓값, 1칸당 크기
const saleMinPrice: number = 0;
const saleMaxPrice: number = 100;
const salePriceGap: number = 1;

export default function Price({ confirmPrice }: PriceProps) {
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<string>('');

  // 보증금 상태 값  minvalue = 왼쪽 range값 maxvalue = 오른쪽 range값
  // Minpercent = 왼쪽 range값 위에 따라다니는 text   maxpercent = 오른쪽
  const [depositMinValue, setdepositMinValue] =
    useState<number>(depositMinPrice);
  const [depositMaxValue, setdepositMaxValue] =
    useState<number>(depositMaxPrice);
  const [depositMinPercent, setdepositMinPercent] = useState<number>(0);
  const [depositMaxPercent, setdepositMaxPercent] = useState<number>(0);

  const [rentMinValue, setrentMinValue] = useState<number>(rentMinPrice);
  const [rentMaxValue, setrentMaxValue] = useState<number>(rentMaxPrice);
  const [rentMinPercent, setrentMinPercent] = useState<number>(0);
  const [rentMaxPercent, setrentMaxPercent] = useState<number>(0);

  const [saleMinValue, setsaleMinValue] = useState<number>(saleMinPrice);
  const [saleMaxValue, setsaleMaxValue] = useState<number>(saleMaxPrice);
  const [saleMinPercent, setsaleMinPercent] = useState<number>(0);
  const [saleMaxPercent, setsaleMaxPercent] = useState<number>(0);

  // 왼쪽 range 값에 따라서 뒤에 있는 div 값을 움직여 값이 채워지는 효과
  const depositMinValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdepositMinValue(parseInt(e.target.value));
  };
  // 오른쪽
  const depositMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdepositMaxValue(parseInt(e.target.value));
  };

  // 왼쪽 range값이 오른쪽 range값을 넘어가지 못하게 조정함 반대의 경우도 마찬가지
  const depositRangeHandler = () => {
    if (depositMaxValue - depositMinValue < depositPriceGap) {
      setdepositMaxValue(depositMinValue + depositPriceGap);
      setdepositMinValue(depositMaxValue - depositPriceGap);
    } else {
      setdepositMinPercent((depositMinValue / depositMaxPrice) * 100);
      setdepositMaxPercent(100 - (depositMaxValue / depositMaxPrice) * 100);
    }
  };

  //위의 보증금의 경우와 같은 로직
  const rentMinValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setrentMinValue(parseInt(e.target.value));
  };

  const rentMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setrentMaxValue(parseInt(e.target.value));
  };

  const rentRangeHandler = () => {
    if (rentMaxValue - rentMinValue < rentPriceGap) {
      setrentMaxValue(rentMinValue + rentPriceGap);
      setrentMinValue(rentMaxValue - rentPriceGap);
    } else {
      setrentMinPercent((rentMinValue / rentMaxPrice) * 100);
      setrentMaxPercent(100 - (rentMaxValue / rentMaxPrice) * 100);
    }
  };

  const saleMinValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsaleMinValue(parseInt(e.target.value));
  };

  const saleMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsaleMaxValue(parseInt(e.target.value));
  };

  const saleRangeHandler = () => {
    if (saleMaxValue - saleMinValue < salePriceGap) {
      setsaleMaxValue(saleMinValue + salePriceGap);
      setsaleMinValue(saleMaxValue - salePriceGap);
    } else {
      setsaleMinPercent((saleMinValue / saleMaxPrice) * 100);
      setsaleMaxPercent(100 - (saleMaxValue / saleMaxPrice) * 100);
    }
  };

  const handleConfirmClick = () => {
    confirmPrice(price);
  };

  const handlePriceType = (priceType: string) => {
    setPriceType(priceType);
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
      <div className={styles.price}>
        {['월세', '전세', '매매'].map((type) => (
          <button
            key={type}
            className={priceType === type ? styles.activeButton : ''}
            onClick={() => handlePriceType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {priceType === '월세' && (
        <Monthly onChange1={() => {}} onChange2={() => {}} />
      )}
      {priceType === '전세' && <Jeonse onChange={() => {}} />}
      {priceType === '매매' && <Purchase onChange={() => {}} />}

      <BottomBtn
        onClick={handleConfirmClick}
        text="확인"
        onAnchorClick={handleSkipBtnClick}
        anchorText="나중에 설정하기"
      />
    </div>
  );
}
