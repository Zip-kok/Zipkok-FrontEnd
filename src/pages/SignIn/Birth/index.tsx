import React, { FormEvent, useState } from 'react';

import styles from './Birth.module.css';

import useBirthInput from '../../../hooks/useBirthInput';

import BottomBtn from '../../../components/BottomBtn';
import TextInput from '../../../components/TextInput';

interface BirthProps {
  onConfirm: (birth: Date) => void;
}

const Birth = ({ onConfirm }: BirthProps) => {
  const handleSubmit = () => {
    if (isBirthValid) {
      onConfirm(birth as Date);
    }
  };

  const [BirthInput, birth, isBirthValid, birthWarningMsg] = useBirthInput();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          생년월일을
          <br />
          알려주세요.
        </h1>
      </div>

      <div className={styles.inputContainer}>
        <BirthInput
          placeholder="6자리 숫자로 입력해주세요"
          handleSubmit={handleSubmit}
          caption={birthWarningMsg}
          captionStyle={{
            color: 'var(--primary-color-primary_default, #FA4549)',
            fontSize: '14px',
            fontWeight: '400',
          }}
        />
      </div>
      <div className={styles.blank}></div>
      <BottomBtn
        onClick={handleSubmit}
        text="확인"
        disabled={!isBirthValid}
        occupySpace
      />
    </div>
  );
};

export default Birth;
