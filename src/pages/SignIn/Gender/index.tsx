import React, { useState } from 'react';

import styles from './Gender.module.css';

import BottomBtn from '../../../components/BottomBtn';
import RadioBtn from '../../../components/RadioBtn';

import { Gender as GenderType } from '../';

interface GenderProps {
  onConfirm: (gender: GenderType) => void;
}

export default function Gender({ onConfirm }: GenderProps) {
  const genderOptions = ['남성', '여성', '비공개'] as Exclude<GenderType, null>[];
  const [gender, setGender] = useState<GenderType>(null);

  const handleSubmit = () => {
    if (gender !== null) {
      onConfirm(gender);
    }
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

      <ul>
        {genderOptions.map((genderOption) => (
          <RadioBtn
            key={genderOption}
            content={genderOption}
            isSelected={genderOption === gender}
            handleClick={() => setGender(genderOption)}
          />
        ))}
      </ul>

      <div className={styles.wrapper}>
        <BottomBtn
          onClick={handleSubmit}
          text="확인"
          disabled={gender === null}
        />
      </div>
    </div>
  );
}
