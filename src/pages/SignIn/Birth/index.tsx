import React, { FormEvent, useState } from 'react';

import styles from './Birth.module.css';

import useBirthInput from '../../../hooks/useBirthInput';

import BottomBtn from '../../../components/BottomBtn';
import LoginInput from '../../../components/LoginInput';

interface BirthProps {
  onConfirm: (birth: Date) => void;
}

const Birth = ({ onConfirm }: BirthProps) => {
  const handleSubmit = () => {
    if (isBirthValid) {
      onConfirm(birth as Date);
    }
  };

  const [BirthInput, birth, isBirthValid, birthWarningMsg] = useBirthInput(
    '6자리 숫자로 입력해주세요.',
    handleSubmit,
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          생년월일을
          <br />
          알려주세요.
        </h1>
      </div>

      <BirthInput />
      <div className={styles.warning}>{birthWarningMsg}</div>
      <div className={styles.blank}></div>
      <BottomBtn onClick={handleSubmit} text="확인" disabled={!isBirthValid} />
    </div>
  );
};

export default Birth;
