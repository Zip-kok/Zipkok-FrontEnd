import React from 'react';
import { useNavigate } from 'react-router-dom';

import searchIcon from 'assets/img/line(2)/search.svg';
import { BottomBtn, TextInput } from 'components';
import useAddressStore from 'contexts/addressStore';
import useCustomKokStore from 'contexts/customKokStore';
import useHistoryState from 'hooks/useHistoryState';
import useRadioBtn from 'hooks/useRadioBtn';

import styles from './CustomProperty.module.css';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

export default function CustomProperty() {
  const { address, setAddress } = useAddressStore();
  const customKokStore = useCustomKokStore();
  const navigate = useNavigate();

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

  const [memo, setMemo] = useHistoryState('memo', customKokStore.memo); // 매물 메모
  const [deposit, setDeposit] = useHistoryState(
    'deposit',
    customKokStore.deposit,
  ); // 보증금
  const [monthlyPrice, setMonthlyPrice] = useHistoryState(
    'monthlyPrice',
    customKokStore.monthlyPrice,
  ); // 월세
  const [price, setPrice] = useHistoryState('price', customKokStore.price); // 매매가
  const [maintanenceFee, setMaintanenceFee] = useHistoryState(
    'maintanenceFee',
    customKokStore.maintanenceFee,
  ); // 관리비
  const [detailAddress, setDetailAddress] = useHistoryState(
    'detailAddress',
    customKokStore.detailAddress,
  ); // 상세 주소
  const [area, setArea] = useHistoryState('area', customKokStore.area); // 넓이
  const [floor, setFloor] = useHistoryState('floor', customKokStore.floor); // 층고

  function canConfirm() {
    if (!address) return false;
    if (maintanenceFee === undefined) return false;

    switch (priceType) {
      case '월세':
        if (deposit === undefined || monthlyPrice === undefined) return false;
        break;
      case '전세':
        if (deposit === undefined) return false;
        break;
      case '매매':
        if (price === undefined) return false;
        break;
    }

    return true;
  }

  function handleConfirm() {
    if (canConfirm()) {
      customKokStore.setAddress(address);
      customKokStore.setMemo(memo);
      customKokStore.setDeposit(deposit);
      customKokStore.setMonthlyPrice(monthlyPrice);
      customKokStore.setPrice(price);
      customKokStore.setMaintanenceFee(maintanenceFee);
      customKokStore.setDetailAddress(detailAddress);
      customKokStore.setArea(area);
      customKokStore.setFloor(floor);
      customKokStore.setHouseType(houseType as HouseType);
      customKokStore.setPriceType(priceType as PriceType);

      navigate('./confirm');
    }
  }

  return (
    <div className={styles.root}>
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
            defaultValue={memo}
            onChange={(e) => setMemo(e.currentTarget.value)}
            maxLength={30}
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
                  numberOnly
                  defaultValue={deposit?.toString()}
                  onChange={(e) => setDeposit(e.currentTarget.valueAsNumber)}
                />
                <p>/</p>
                <TextInput
                  style="roundedBox"
                  placeholder="50"
                  numberOnly
                  defaultValue={monthlyPrice?.toString()}
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
                  numberOnly
                  defaultValue={deposit?.toString()}
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
                  numberOnly
                  defaultValue={price?.toString()}
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
              placeholder="5"
              numberOnly
              defaultValue={maintanenceFee?.toString()}
              onChange={(e) => setMaintanenceFee(e.currentTarget.valueAsNumber)}
            />
            <p>만원</p>
          </div>
        </div>

        {/* 주소 */}
        <div className={styles.inputContainer}>
          <p className={styles.inputTitle}>주소</p>

          <TextInput
            placeholder="주소 검색"
            value={address.address_name}
            icon={searchIcon}
            style="roundedBox"
            onClick={() => navigate('./locationEdit')}
            readOnly
          />
          <TextInput
            placeholder="상세 주소 입력"
            defaultValue={detailAddress}
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
              numberOnly
              defaultValue={area?.toString()}
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
              numberOnly
              defaultValue={floor?.toString()}
              onChange={(e) => setFloor(e.currentTarget.valueAsNumber)}
            />
            <p>층</p>
          </div>
        </div>
      </div>

      <BottomBtn
        text="등록하기"
        disabled={!canConfirm()}
        onClick={handleConfirm}
      />
    </div>
  );
}
