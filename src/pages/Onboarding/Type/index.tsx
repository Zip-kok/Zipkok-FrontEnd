import React from 'react';
import { useNavigate } from 'react-router-dom';

import apartmentIcon from 'assets/img/login/apartment.svg';
import officetelIcon from 'assets/img/login/officetel.svg';
import oneroomIcon from 'assets/img/login/oneroom.svg';
import tworoomIcon from 'assets/img/login/tworoom.svg';
import { BottomBtn } from 'components';
import useRadioBtn from 'hooks/useRadioBtn';

import styles from './Type.module.css';

import type { HouseType } from 'types/HouseType';

interface TypeProps {
  confirmHouseType: (houseType: HouseType) => void;
  handleSkip: () => void;
}

export default function Type({ confirmHouseType, handleSkip }: TypeProps) {
  const navigate = useNavigate();
  const houseTypeOptions: { value: HouseType; content: JSX.Element }[] = [
    {
      value: 'APARTMENT',
      content: (
        <>
          <img src={apartmentIcon}></img>
          <span>아파트</span>
        </>
      ),
    },
    {
      value: 'ONEROOM',
      content: (
        <>
          <img src={oneroomIcon}></img>
          <span>원룸</span>
        </>
      ),
    },
    {
      value: 'TWOROOM',
      content: (
        <>
          <img src={tworoomIcon}></img>
          <span>빌라/투룸</span>
        </>
      ),
    },
    {
      value: 'OFFICETELL',
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
        onAnchorClick={handleSkip}
        anchorText="나중에 설정하기"
        disabled={houseType === undefined}
        occupySpace
      />
    </div>
  );
}
