import React from 'react';

import BottomBtn from '../../../components/BottomBtn';

import styles from './Type.module.css';

import apartmentIcon from '../../../assets/img/apartment.svg';
import oneroomIcon from '../../../assets/img/oneroom.svg';
import tworoomIcon from '../../../assets/img/tworoom.svg';
import officetelIcon from '../../../assets/img/officetel.svg';

import { HouseType } from '../';

interface TypeProps {
  confirmHouseType: (houseType: HouseType) => void;
}

export default function Type({ confirmHouseType }: TypeProps) {
  const [houseType, setHouseType] = React.useState<HouseType>(null);

  function handleSubmit() {
    if (houseType === null) return;
    confirmHouseType(houseType);
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

      <div className={styles.typeBtnContainer}>
        <button
          className={`${styles.typeBtn} ${
            houseType === '아파트' ? styles.selected : ''
          }`}
          onClick={() => setHouseType('아파트')}
        >
          <img src={apartmentIcon}></img>
          <span>아파트</span>
        </button>
        <button
          className={`${styles.typeBtn} ${
            houseType === '원룸' ? styles.selected : ''
          }`}
          onClick={() => setHouseType('원룸')}
        >
          <img src={oneroomIcon}></img>
          <span>원룸</span>
        </button>
        <button
          className={`${styles.typeBtn} ${
            houseType === '빌라/투룸' ? styles.selected : ''
          }`}
          onClick={() => setHouseType('빌라/투룸')}
        >
          <img src={tworoomIcon}></img>
          <span>빌라/투룸</span>
        </button>
        <button
          className={`${styles.typeBtn} ${
            houseType === '오피스텔' ? styles.selected : ''
          }`}
          onClick={() => setHouseType('오피스텔')}
        >
          <img src={officetelIcon}></img>
          <span>오피스텔</span>
        </button>
      </div>
      <BottomBtn
        onClick={handleSubmit}
        text="확인"
        onAnchorClick={() => {}}
        anchorText="나중에 설정하기"
        disabled={houseType === null}
      />
    </div>
  );
}
