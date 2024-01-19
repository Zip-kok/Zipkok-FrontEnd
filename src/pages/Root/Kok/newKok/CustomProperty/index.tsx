import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CustomProperty.module.css';

import BottomBtn from '../../../../../components/BottomBtn';
import Header from '../../../../../components/Header';
import TextInput from '../../../../../components/TextInput';

import useRadioBtn from '../../../../../hooks/useRadioBtn';
import useAddressStore from '../../../../../contexts/addressStore';
import useNaviStore from '../../../../../contexts/naviStore';

import searchIcon from '../../../../../assets/img/search.svg';

import { HouseType, PriceType } from '../../../../Onboarding';

export default function CustomProperty() {
  const address = useAddressStore((store) => store.address);

  const navigate = useNavigate();

  const [memo, setMemo] = useState(''); // 매물 메모
  const [deposit, setDeposit] = useState(0); // 보증금
  const [monthlyPrice, setMonthlyPrice] = useState(0); // 월세
  const [price, setPrice] = useState(0); // 매매가
  const [maintenanceFee, setMaintenanceFee] = useState(0); // 관리비
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

      <div className={styles.header}>
        <h1>
          콕리스트를 작성할
          <br />
          매물을 직접 등록해보세요.
        </h1>
      </div>

      <div className={styles.body}>
        {/* 매물 메모 */}
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>매물 메모</p>
          <TextInput
            style="roundedBox"
            placeholder="매물에 대한 메모를 작성해주세요. (최대 30자)"
            defaultValue="정릉시장 파바 앞"
            onChange={(e) => setMemo(e.currentTarget.value)}
          />
        </div>

        {/* 필터 설정 */}
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>필터 설정</p>

          <div className={styles.filterContainers}>
            {/* 가격 타입 */}
            <PriceTypeRadioBtnContainer className={styles.filterContainer} />

            {/* 집 타입 */}
            <HouseTypeRadioBtnContainer className={styles.filterContainer} />
          </div>
        </div>

        {/* 가격 */}
        <div className={styles.inputContainer}>
          {/* 월세 */}
          {priceType === '월세' && (
            <>
              <p className={styles.inputTitle}>보증금 / 월세</p>
              <div className={styles.monthlyPriceContainer}>
                <TextInput
                  style="roundedBox"
                  placeholder="1000"
                  defaultValue="1000"
                  numberOnly
                  onChange={(e) => setDeposit(e.currentTarget.valueAsNumber)}
                />
                <p>/</p>
                <TextInput
                  style="roundedBox"
                  placeholder="50"
                  defaultValue="50"
                  numberOnly
                  onChange={(e) =>
                    setMonthlyPrice(e.currentTarget.valueAsNumber)
                  }
                />
              </div>
            </>
          )}

          {/* 전세 */}
          {priceType === '전세' && (
            <>
              <p className={styles.inputTitle}>보증금</p>
              <div className={styles.priceInputContainer}>
                <TextInput
                  style="roundedBox"
                  placeholder="1000"
                  defaultValue="1000"
                  numberOnly
                  onChange={(e) => setDeposit(e.currentTarget.valueAsNumber)}
                />
                <p>만원</p>
              </div>
            </>
          )}

          {/* 매매 */}
          {priceType === '매매' && (
            <>
              <p className={styles.inputTitle}>매매가</p>
              <div className={styles.priceInputContainer}>
                <TextInput
                  style="roundedBox"
                  placeholder="1000"
                  defaultValue="1000"
                  numberOnly
                  onChange={(e) => setPrice(e.currentTarget.valueAsNumber)}
                />
                <p>만원</p>
              </div>
            </>
          )}
        </div>

        {/* 관리비 */}
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>관리비</p>
          <div className={styles.priceInputContainer}>
            <TextInput
              style="roundedBox"
              placeholder="3.5"
              defaultValue="3.5"
              numberOnly
              onChange={(e) => setMaintenanceFee(e.currentTarget.valueAsNumber)}
            />
            <p>만원</p>
          </div>
        </div>

        {/* 주소 */}
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>주소</p>

          <TextInput
            placeholder="주소 검색"
            defaultValue={address}
            icon={searchIcon}
            style="roundedBox"
            onClick={() => navigate('./locationEdit')}
            readOnly
          />
          <TextInput
            placeholder="상세 주소 입력"
            value={detailAddress}
            style="roundedBox"
            onChange={(e) => setDetailAddress(e.currentTarget.value)}
          />
        </div>

        {/* 넓이 */}
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>[선택] 넓이</p>
          <div className={styles.priceInputContainer}>
            <TextInput
              style="roundedBox"
              placeholder="5"
              defaultValue="8"
              numberOnly
              onChange={(e) => setArea(e.currentTarget.valueAsNumber)}
            />
            <p>평</p>
          </div>
        </div>

        {/* 층고 */}
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>[선택] 층고</p>
          <div className={styles.priceInputContainer}>
            <TextInput
              style="roundedBox"
              placeholder="1"
              defaultValue="2"
              numberOnly
              onChange={(e) => setFloor(e.currentTarget.valueAsNumber)}
            />
            <p>층</p>
          </div>
        </div>
      </div>

      <BottomBtn text="등록하기" disabled={!canConfirm()} onClick={() => {}} />
    </div>
  );
}
