import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProfileEditInfo } from 'apis';
import { ProfileEditInfo } from 'apis/getProfileEditInfo';
import { UserDetail } from 'apis/getUserDetail';
import { putUser } from 'apis/putUser';
import searchIcon from 'assets/img/line(2)/search.svg';
import { TextInput, BottomBtn } from 'components';
import useAddressStore from 'contexts/addressStore';
import useModal from 'contexts/modalStore';
import useUIStore from 'contexts/uiStore';
import useMyPageStore from 'contexts/useMyPageStore';
import useBirthInput from 'hooks/useBirthInput';
import useRadioBtn from 'hooks/useRadioBtn';
import { StatusCode } from 'types/StatusCode';

import styles from './ProfileEdit.module.css';
import Jeonse from '../../../Onboarding/Price/priceSlider/Jeonse';
import Monthly from '../../../Onboarding/Price/priceSlider/Monthly';
import Purchase from '../../../Onboarding/Price/priceSlider/Purchase';
import { Gender } from '../../../SignIn';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

type PriceRange = [number, number];

const ProfileEdit = () => {
  const [UserDetail, setUserDetail] = useState<UserDetail>();
  const ui = useUIStore();
  const [profileEditInfo, setProfileEditInfo] = useState<ProfileEditInfo>();

  const MyPageStore = useMyPageStore((store) => store);
  const modal = useModal();

  useEffect(() => {
    getProfileEditInfo().then((res) => setProfileEditInfo(res.result));
    if (profileEditInfo?.imageUrl !== undefined) {
      setImgSrc(profileEditInfo?.imageUrl);
    }

    ui.setUI((state) => ({
      ...state,
      headerTitle: '프로필 수정하기',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);

  // 성별 라디오 버튼
  const genderOptions: { value: Gender; content: string }[] = [
    { value: 'MALE', content: '남' },
    { value: 'FEMALE', content: '여' },
    { value: 'DISCLOSURE', content: '비공개' },
  ];
  const [GenderRadioBtnContainer, gender] = useRadioBtn<Gender>(
    genderOptions,
    'round',
    MyPageStore.gender,
  );

  // 집 형태 라디오 버튼
  const houseTypeOptions: { value: HouseType; content: string }[] = [
    { value: 'ONEROOM', content: '원룸' },
    { value: 'OFFICETELL', content: '오피스텔' },
    { value: 'APARTMENT', content: '아파트' },
    { value: 'TWOROOM', content: '빌라/투룸' },
  ];
  const [HouseTypeRadioBtnContainer, houseType] = useRadioBtn<HouseType>(
    houseTypeOptions,
    'tag',
    MyPageStore.realEstateType,
  );

  // 가격 타입 라디오 버튼
  const priceTypeOptions: { value: PriceType; content: string }[] = [
    { value: '월세', content: '월세' },
    { value: '전세', content: '전세' },
    { value: '매매', content: '매매' },
  ];
  const [PriceTypeRadioBtnContainer, priceType] = useRadioBtn<PriceType>(
    priceTypeOptions,
    'tag',
    MyPageStore.transactionType,
  );

  const [imgSrc, setImgSrc] = useState('');
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [BirthInput, , , birthWarningMsg] = useBirthInput();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const address = useAddressStore((state) => state.address);

  const defaultValues: Record<PriceType, PriceRange[]> = {
    월세: [
      [MyPageStore.mdepositMin || 0, MyPageStore.mdepositMax || 60_000_000],
      [MyPageStore.mpriceMin || 0, MyPageStore.mpriceMax || 400_000],
    ],
    전세: [
      [MyPageStore.ydepositMin || 0, MyPageStore.ydepositMax || 60_000_000],
    ],
    매매: [[MyPageStore.priceMin || 0, MyPageStore.priceMax || 120_000_000]],
  };

  const navigate = useNavigate();

  const handleConfirmClick = async () => {
    try {
      const baseData = {
        nickname: MyPageStore.nickname || '',
        birthday: MyPageStore.birthday || '',
        gender: MyPageStore.gender as Gender,
        realEstateType: MyPageStore.realEstateType as HouseType,
        address: MyPageStore.address?.address_name || '',
        latitude: MyPageStore.address?.y || 0,
        longitude: MyPageStore.address?.x || 0,
        transactionType: MyPageStore.transactionType as PriceType,
      };
      const priceData =
        priceType === '월세'
          ? {
              mpriceMin: priceRanges[1][0],
              mpriceMax: priceRanges[1][1],
              mdepositMin: priceRanges[0][0],
              mdepositMax: priceRanges[0][1],
              ydepositMin: 0,
              ydepositMax: 0,
              purchaseMin: 0,
              purchaseMax: 0,
            }
          : priceType === '전세'
            ? {
                mpriceMin: 0,
                mpriceMax: 0,
                mdepositMin: 0,
                mdepositMax: 0,
                ydepositMin: priceRanges[0][0],
                ydepositMax: priceRanges[0][1],
                purchaseMin: 0,
                purchaseMax: 0,
              }
            : {
                mpriceMin: 0,
                mpriceMax: 0,
                mdepositMin: 0,
                mdepositMax: 0,
                ydepositMin: 0,
                ydepositMax: 0,
                purchaseMin: priceRanges[0][0],
                purchaseMax: priceRanges[0][1],
              };

      const imgres = await fetch(imgSrc);
      const blob = await imgres.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      const userInfo = {
        file: file,
        data: { ...baseData, ...priceData },
      };
      const response = await putUser(userInfo);

      switch (response.code) {
        case StatusCode.MEMBER_INFO_UPDATE_SUCCESS:
          navigate(-1);
          break;
        case StatusCode.INVALID_NICKNAME_FORMAT:
          modal.open({
            title: '입력값 오류',
            description: '입력하신 닉네임의 형식이 올바르지 않습니다.',
            primaryButton: '확인',
          });
          break;
        case StatusCode.INVALID_GENDER_FORMAT:
          modal.open({
            title: '입력값 오류',
            description: '입력하신 성별의 형식이 올바르지 않습니다.',
            primaryButton: '확인',
          });
          break;
        case StatusCode.INVALID_BIRTHDAY_FORMAT:
          modal.open({
            title: '입력값 오류',
            description: '입력하신 생년월일의 형식이 올바르지 않습니다.',
            primaryButton: '확인',
          });
          break;
        case StatusCode.ADDRESS_OVER_LENGTH:
        case StatusCode.INVALID_LAT_LNG:
          // 주소 관련 오류 처리
          modal.open({
            title: '주소 오류',
            description: '주소 정보가 유효하지 않습니다.',
            primaryButton: '확인',
          });
          break;
        default:
          modal.open({
            title: '오류 발생',
            description: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
            primaryButton: '확인',
          });
      }
    } catch (error) {
      console.log(error);
      modal.open({
        title: '네트워크 오류',
        description:
          '서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        primaryButton: '확인',
      });
    }
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
            src={
              MyPageStore.imageUrl ||
              'https://picpac.kr/common/img/default_profile.png'
            }
            onClick={handleImgClick}
          />
          <p onClick={handleImgClick}>수정하기</p>
        </div>

        {/* 닉네임 */}
        <div className={styles.inputContainer}>
          <p className={styles.title}>닉네임</p>
          <TextInput
            placeholder="최대 12자"
            defaultValue={MyPageStore.nickname}
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
              defaultValue={MyPageStore.birthday}
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
            defaultValue={address.address_name}
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
