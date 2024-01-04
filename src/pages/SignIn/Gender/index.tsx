import React, { useState } from 'react';
import BottomBtn from '../../../components/BottomBtn';
import RadioBtn from '../../../components/RadioBtn';
import styles from './Gender.module.css';

interface GenderProps {
  onConfirm: () => void;
}

export default function Gender({ onConfirm }: GenderProps) {
  const genderOptions = ['남성', '여성', '비공개'];
  const [selectedGenderIndex, setSelectedGenderIndex] = useState(-1);

  const handleGenderSelect = (index: number) => {
    setSelectedGenderIndex(index);
  };

  const handleSubmit = () => {
    if (selectedGenderIndex !== -1) {
      onConfirm();
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
        {genderOptions.map((gender, index) => (
          <RadioBtn
            key={index}
            content={gender}
            isSelected={selectedGenderIndex === index}
            handleClick={() => handleGenderSelect(index)}
          />
        ))}
      </ul>

      <div className={styles.wrapper}>
        <BottomBtn
          onClick={handleSubmit}
          text="확인"
          disabled={selectedGenderIndex === -1}
        />
      </div>
    </div>
  );
}
