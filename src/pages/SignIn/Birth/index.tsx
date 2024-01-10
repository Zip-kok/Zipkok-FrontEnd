import React, { FormEvent, useState } from 'react';

import styles from './Birth.module.css';

import BottomBtn from '../../../components/BottomBtn';
import LoginInput from '../../../components/LoginInput';

interface BirthProps {
  onConfirm: () => void;
}

const Birth: React.FC<BirthProps> = ({ onConfirm }) => {
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
      onConfirm();
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
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div className={styles.wrapper}>
        <BottomBtn
          onClick={handleSubmit}
          text="확인"
          disabled={!isBirthValid}
        />
      </div>
    </div>
  );
};

export default Birth;
