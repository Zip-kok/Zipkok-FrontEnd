import React, { useState } from 'react';

import { BottomBtn } from 'components';
import useRadioBtn from 'hooks/useRadioBtn';

import styles from './Gender.module.css';
import { Gender as GenderType } from '../';

interface GenderProps {
  onConfirm: (gender: GenderType) => void;
}

export default function Gender({ onConfirm }: GenderProps) {
  const genderOptions = [
    {
      value: 'MALE' as GenderType,
      content: '남자',
    },
    {
      value: 'FEMALE' as GenderType,
      content: '여자',
    },
    {
      value: 'UNDISCLOSED ' as GenderType,
      content: '비공개',
    },
  ];
  const [RadioBtnContainer, gender] = useRadioBtn<GenderType>(genderOptions);

  const handleSubmit = () => {
    if (gender !== undefined) onConfirm(gender);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          성별을
          <br />
          알려주세요.
        </h1>
      </div>

      <RadioBtnContainer className={styles.genderBtnContainer} />

      <div className={styles.blank}></div>

      <BottomBtn
        onClick={handleSubmit}
        text="확인"
        disabled={gender === undefined}
        occupySpace
      />
    </div>
  );
}
