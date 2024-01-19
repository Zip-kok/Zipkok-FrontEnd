import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CustomProperty.module.css';

import BeforeConfirm from './BeforeConfirm';

import useRadioBtn from '../../../../../hooks/useRadioBtn';
import useAddressStore from '../../../../../contexts/addressStore';
import useNaviStore from '../../../../../contexts/naviStore';

import { HouseType, PriceType } from '../../../../Onboarding';
import Header from '../../../../../components/Header';
import PropertyInfo from '../../../../../components/PropertyInfo';

export default function CustomProperty() {
  const address = useAddressStore((store) => store.address);

  const navigate = useNavigate();

  const [isConfirming, setIsConfirming] = useState(false); // 등록 버튼 클릭 여부

  const [memo, setMemo] = useState(''); // 매물 메모
  const [deposit, setDeposit] = useState(0); // 보증금
  const [monthlyPrice, setMonthlyPrice] = useState(0); // 월세
  const [price, setPrice] = useState(0); // 매매가
  const [maintanenceFee, setMaintanenceFee] = useState(0); // 관리비
  const [detailAddress, setDetailAddress] = useState('201호'); // 상세 주소
  const [area, setArea] = useState(0); // 넓이
  const [floor, setFloor] = useState(0); // 층고

  function canConfirm() {
    return address.length > 0 && detailAddress.length > 0;
  }

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(false);
  }, []);

  // 집 형태 라디오 버튼
  const houseTypeOptions = [
    { value: '원룸' as HouseType, content: '원룸' },
    { value: '오피스텔' as HouseType, content: '오피스텔' },
    { value: '아파트' as HouseType, content: '아파트' },
    { value: '빌라/투룸' as HouseType, content: '빌라/투룸' },
  ];
  const [HouseTypeRadioBtnContainer, houseType] = useRadioBtn<HouseType>(
    houseTypeOptions,
    'tag',
    '원룸',
  );

  // 가격 타입 라디오 버튼
  const priceTypeOptions = [
    { value: '월세' as PriceType, content: '월세' },
    { value: '전세' as PriceType, content: '전세' },
    { value: '매매' as PriceType, content: '매매' },
  ];
  const [PriceTypeRadioBtnContainer, priceType] = useRadioBtn<PriceType>(
    priceTypeOptions,
    'tag',
    '월세',
  );

  return (
    <div className={styles.root}>
      <div className="top">
        <Header
          title="매물 직접 등록하기"
          backBtnEnabled
          onBack={() => navigate(-1)}
        />
      </div>

      {/* 등록 전 */}
      {!isConfirming && (
        <BeforeConfirm
          address={address}
          detailAddress={detailAddress}
          setIsConfirming={setIsConfirming}
          setMemo={setMemo}
          setDeposit={setDeposit}
          setMonthlyPrice={setMonthlyPrice}
          setPrice={setPrice}
          setMaintanenceFee={setMaintanenceFee}
          setDetailAddress={setDetailAddress}
          setArea={setArea}
          setFloor={setFloor}
        />
      )}

      {/* 등록 후 */}
      {isConfirming && houseType && priceType && (
        <PropertyInfo
          picture={undefined}
          address={address}
          memo={memo}
          deposit={deposit}
          monthlyPrice={monthlyPrice}
          price={price}
          maintanenceFee={maintanenceFee}
          detailAddress={detailAddress}
          area={area}
          floor={floor}
          houseType={houseType}
          priceType={priceType}
        />
      )}
    </div>
  );
}
