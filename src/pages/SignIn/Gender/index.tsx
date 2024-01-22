import React, { useState } from 'react';

import styles from './Gender.module.css';

import useRadioBtn from 'hooks/useRadioBtn';

import BottomBtn from 'components/BottomBtn';

import { Gender as GenderType } from '../';

interface GenderProps {
  onConfirm: (gender: GenderType) => void;
}

export default function Gender({ onConfirm }: GenderProps) {
  const genderOptions = [
    {
      value: '남자' as GenderType,
      content: '남자',
    },
    {
      value: '여자' as GenderType,
      content: '여자',
    },
    {
      value: '비공개' as GenderType,
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
