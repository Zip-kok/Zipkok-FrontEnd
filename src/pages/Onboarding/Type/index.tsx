import React from 'react';

import styles from './Type.module.css';

import useRadioBtn from '../../../hooks/useRadioBtn';
import BottomBtn from '../../../components/BottomBtn';

import apartmentIcon from '../../../assets/img/apartment.svg';
import oneroomIcon from '../../../assets/img/oneroom.svg';
import tworoomIcon from '../../../assets/img/tworoom.svg';
import officetelIcon from '../../../assets/img/officetel.svg';

import { HouseType } from '../';
import { useNavigate } from 'react-router-dom';

interface TypeProps {
  confirmHouseType: (houseType: HouseType) => void;
}

export default function Type({ confirmHouseType }: TypeProps) {
  const navigate = useNavigate();
  const houseTypeOptions = [
    {
      value: '아파트' as HouseType,
      content: (
        <>
          <img src={apartmentIcon}></img>
          <span>아파트</span>
        </>
      ),
    },
    {
      value: '원룸' as HouseType,
      content: (
        <>
          <img src={oneroomIcon}></img>
          <span>원룸</span>
        </>
      ),
    },
    {
      value: '빌라/투룸' as HouseType,
      content: (
        <>
          <img src={tworoomIcon}></img>
          <span>빌라/투룸</span>
        </>
      ),
    },
    {
      value: '오피스텔' as HouseType,
      content: (
        <>
          <img src={officetelIcon}></img>
          <span>오피스텔</span>
        </>
      ),
    },
  ];
  const [RadioBtnContainer, houseType] = useRadioBtn<HouseType>(
    houseTypeOptions,
    'icon',
  );

  function handleSubmit() {
    if (houseType !== undefined) confirmHouseType(houseType);
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          어떤 형태의 집을
          <br />
          알아보고 있나요?
        </h1>
      </div>

      <RadioBtnContainer className={styles.typeBtnContainer} />

      <BottomBtn
        onClick={handleSubmit}
        text="확인"
        onAnchorClick={() => navigate('/')}
        anchorText="나중에 설정하기"
        disabled={houseType === null}
      />
    </div>
  );
}
