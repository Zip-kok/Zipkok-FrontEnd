import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.css';

import useNaviStore from '../../../../contexts/naviStore';
import useBirthInput from '../../../../hooks/useBirthInput';

import searchIcon from '../../../../assets/img/search.svg';
import TextInput from '../../../../components/TextInput';
import Header from '../../../../components/Header';
import EditGenderBtn from '../../../../components/EditGenderBtn/indes';
import EditFilterBtn from '../../../../components/EditFilterBtn';
import BottomBtn from '../../../../components/Btn';
import Monthly from '../../../Onboarding/Price/priceSlider/Monthly';
import Jeonse from '../../../Onboarding/Price/priceSlider/Jeonse';
import Purchase from '../../../Onboarding/Price/priceSlider/Purchase';

interface genderTypeState {
  genderType: '남성' | '여성' | '비공개';
}
interface priceTypeState {
  priceType: '월세' | '전세' | '매매';
}
interface homeTypeState {
  homeType: '원룸' | '투룸' | '오피스텔' | '아파트';
}
type PriceRange = [number, number];

const ProfileEdit = () => {
  const [genderType, setGenderType] = useState<genderTypeState>({
    genderType: '비공개',
  });
  const [priceType, setPriceType] = useState<priceTypeState>({
    priceType: '월세',
  });
  const [homeType, setHomeType] = useState<homeTypeState>({
    homeType: '원룸',
  });

  const [imgSrc, setImgSrc] = useState('');
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [BirthInput, birth, isBirthValid, birthWarningMsg] = useBirthInput();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('my');
    setShowNaviBar(false);
  }, []);

  const defaultValues: Record<
    Exclude<priceTypeState['priceType'], null>,
    PriceRange[]
  > = {
    월세: [
      [0, 60_000_000],
      [0, 400_000],
    ],
    전세: [[0, 60_000_000]],
    매매: [[0, 120_000_000]],
  };

  const genderTypes: genderTypeState[] = [
    { genderType: '남성' },
    { genderType: '여성' },
    { genderType: '비공개' },
  ];
  const priceTypes: priceTypeState[] = [
    { priceType: '월세' },
    { priceType: '전세' },
    { priceType: '매매' },
  ];
  const homeTypes: homeTypeState[] = [
    { homeType: '원룸' },
    { homeType: '투룸' },
    { homeType: '오피스텔' },
    { homeType: '아파트' },
  ];

  const handleGenderClick = (selectedType: '남성' | '여성' | '비공개') => {
    setGenderType({
      ...genderType,
      genderType: selectedType,
    });
  };
  const handlePriceClick = (selectedType: '월세' | '전세' | '매매') => {
    setPriceType({
      ...priceType,
      priceType: selectedType,
    });
    setPriceType({
      priceType: selectedType,
    });
  };
  const handleHomeClick = (
    selectedType: '원룸' | '투룸' | '오피스텔' | '아파트',
  ) => {
    setHomeType({
      ...homeType,
      homeType: selectedType,
    });
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
          <p>수정하기</p>
        </div>

        {/* 닉네임 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>닉네임</p>
          <TextInput
            defaultValue="보리는 강아지 내가 주인"
            placeholder="닉네임을 입력해주세요"
            style="roundedBox"
          />
        </div>

        {/* 생년월일 및 성별 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>생년월일</p>

          <div className={styles.birthGenerContainer}>
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

            {genderTypes.map((type) => (
              <EditGenderBtn
                key={type.genderType}
                text={
                  type.genderType === '남성'
                    ? '남'
                    : type.genderType === '여성'
                      ? '여'
                      : type.genderType
                }
                onClick={() => handleGenderClick(type.genderType)}
                isSelected={type.genderType === genderType.genderType}
              />
            ))}
          </div>
        </div>

        {/* 희망 거주지역 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>희망 거주지역</p>
          <TextInput
            defaultValue="서울특별시 성북구 정릉동"
            icon={searchIcon}
            style="roundedBox"
            onClick={() => {}}
            readOnly
          />
        </div>

        {/* 필터 설정 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>필터 설정</p>

          <div className={styles.filterContainers}>
            {/* 가격 타입 */}
            <div className={styles.filterContainer}>
              {priceTypes.map((type) => (
                <EditFilterBtn
                  key={type.priceType}
                  text={type.priceType}
                  onClick={() => handlePriceClick(type.priceType)}
                  isSelected={type.priceType === priceType.priceType}
                />
              ))}
            </div>

            {/* 집 타입 */}
            <div className={styles.filterContainer}>
              {homeTypes.map((type) => (
                <EditFilterBtn
                  key={type.homeType}
                  text={type.homeType}
                  onClick={() => handleHomeClick(type.homeType)}
                  isSelected={type.homeType === homeType.homeType}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 가격 설정 */}
        <div className={styles.priceSliderContainer}>
          {priceType?.priceType === '월세' && (
            <Monthly
              onChange1={(rangeStart, rangeEnd) => {
                setPriceRanges((prev) => [[rangeStart, rangeEnd], prev[1]]);
              }}
              onChange2={(rangeStart, rangeEnd) => {
                setPriceRanges((prev) => [prev[0], [rangeStart, rangeEnd]]);
              }}
              defaultValues={defaultValues[priceType.priceType]}
            />
          )}

          {priceType?.priceType === '전세' && (
            <Jeonse
              onChange={(rangeStart, rangeEnd) => {
                setPriceRanges([[rangeStart, rangeEnd]]);
              }}
              defaultValues={defaultValues[priceType.priceType]}
            />
          )}

          {priceType?.priceType === '매매' && (
            <Purchase
              onChange={(rangeStart, rangeEnd) => {
                setPriceRanges([[rangeStart, rangeEnd]]);
              }}
              defaultValues={defaultValues[priceType.priceType]}
            />
          )}
        </div>
      </div>

      <div className={styles.btnContainer}>
        <BottomBtn text="수정완료" onClick={handleConfirmClick} />
      </div>
    </div>
  );
};

export default ProfileEdit;
