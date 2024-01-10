import React, { FormEvent, useState } from 'react';

import styles from './Birth.module.css';

import BottomBtn from '../../../components/BottomBtn';
import LoginInput from '../../../components/LoginInput';

interface BirthProps {
  onConfirm: (birth: string) => void;
}

const Birth = ({ onConfirm }: BirthProps) => {
  const [birth, setBirth] = useState<string>('');
  const [isBirthValid, setIsBirthValid] = useState<boolean>(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const isValid = value.length === 6 && /^\d+$/.test(value);

    setBirth(value);
    setIsBirthValid(isValid);
  };

  const handleSubmit = () => {
    if (isBirthValid) {
      onConfirm(birth);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          생년월일을
          <br />
          알려주세요.
        </h1>
      </div>

      <LoginInput
        value={birth}
        placeholder="6자리 숫자로 입력해주세요"
        numberOnly
        maxLength={6}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <div className={styles.blank}></div>

      <BottomBtn onClick={handleSubmit} text="확인" disabled={!isBirthValid} />
    </div>
  );
};

export default Birth;
