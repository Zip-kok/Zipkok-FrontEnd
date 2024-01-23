import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ProfileEdit.module.css';

import useRadioBtn from '../../../../hooks/useRadioBtn';
import useBirthInput from '../../../../hooks/useBirthInput';
import useNaviStore from '../../../../contexts/naviStore';
import useAddressStore from '../../../../contexts/addressStore';

import searchIcon from '../../../../assets/img/line(1)/search.svg';
import TextInput from '../../../../components/TextInput';
import Header from '../../../../components/Header';
import BottomBtn from '../../../../components/BottomBtn';
import Monthly from '../../../Onboarding/Price/priceSlider/Monthly';
import Jeonse from '../../../Onboarding/Price/priceSlider/Jeonse';
import Purchase from '../../../Onboarding/Price/priceSlider/Purchase';

import { Gender } from '../../../SignIn';
import { HouseType } from '../../../Onboarding';
import { PriceType } from '../../../Onboarding';

type PriceRange = [number, number];

const ProfileEdit = () => {
  // 성별 라디오 버튼
  const genderOptions = [
    { value: '남자' as Gender, content: '남' },
    { value: '여자' as Gender, content: '여' },
    { value: '비공개' as Gender, content: '비공개' },
  ];
  const [GenderRadioBtnContainer, gender] = useRadioBtn<Gender>(
    genderOptions,
    'round',
    '남자',
  );

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

  const [imgSrc, setImgSrc] = useState('');
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [BirthInput, , , birthWarningMsg] = useBirthInput();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('my');
    setShowNaviBar(false);
  }, []);

  const address = useAddressStore((state) => state.address);

  const defaultValues: Record<PriceType, PriceRange[]> = {
    월세: [
      [0, 60_000_000],
      [0, 400_000],
    ],
    전세: [[0, 60_000_000]],
    매매: [[0, 120_000_000]],
  };

  const navigate = useNavigate();
  const handleConfirmClick = () => {
    navigate(-1);
  };

  // 이미지 누르면 파일 업로드 로직
  const fileChange = async (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    await new Promise<void>((resolve) => {
      reader.onload = () => {
        resolve();
      };
    });

    setImgSrc(reader.result as string);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      fileChange(e.target.files[0]);
    }
  };
  const handleImgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.root}>
      <div className="top">
        <Header
          title="프로필 수정하기"
          backBtnEnabled={true}
          onBack={() => {
            navigate(-1);
          }}
        />
      </div>

      <div className={styles.body}>
        {/* 프로필 이미지 */}
        <div className={styles.imgContainer}>
          <input
            id="inputFile"
            type="file"
            name="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <img
            src={imgSrc || 'https://picpac.kr/common/img/default_profile.png'}
            onClick={handleImgClick}
          />
          <p onClick={handleImgClick}>수정하기</p>
        </div>

        {/* 닉네임 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>닉네임</p>
          <TextInput
            placeholder="최대 12자"
            defaultValue="보리는 강아지 내가 주인"
            maxLength={12}
            style="roundedBox"
            captionStyle={{
              color: 'var(--primary-color-primary_default, #FA4549)',
              fontSize: '14px',
              fontWeight: '400',
            }}
          />
        </div>

        {/* 생년월일 및 성별 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>생년월일</p>

          <div className={styles.birthGenderContainer}>
            <BirthInput
              defaultValue="011203"
              placeholder="6자리 숫자로 입력해주세요"
              style="roundedBox"
              caption={birthWarningMsg}
              captionStyle={{
                color: 'var(--primary-color-primary_default, #FA4549)',
                fontSize: '14px',
                fontWeight: '400',
              }}
            />

            <GenderRadioBtnContainer className={styles.genderBtnContainer} />
          </div>
        </div>

        {/* 희망 거주지역 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>희망 거주지역</p>
          <TextInput
            defaultValue={address}
            icon={searchIcon}
            style="roundedBox"
            onClick={() => navigate('/my/profileEdit/locationEdit')}
            readOnly
          />
        </div>

        {/* 필터 설정 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>필터 설정</p>

          <div className={styles.filterContainers}>
            {/* 가격 타입 */}
            <PriceTypeRadioBtnContainer className={styles.filterContainer} />

            {/* 집 타입 */}
            <HouseTypeRadioBtnContainer className={styles.filterContainer} />
          </div>
        </div>

        {/* 가격 설정 */}
        <div className={styles.priceSliderContainer}>
          <div>
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
      </div>

      <div className={styles.blank}></div>

      <BottomBtn text="수정 완료" onClick={handleConfirmClick} occupySpace />
    </div>
  );
};

export default ProfileEdit;
