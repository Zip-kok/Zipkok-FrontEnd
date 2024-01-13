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
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setBirth(value);

    if (value.length === 6) {
      const isValid = isValidDate(value);
      setIsBirthValid(isValid);
      setShowWarning(!isValid); // 6자리 입력 후에만 경고 메시지 상태 업데이트
    } else {
      setIsBirthValid(false);
      setShowWarning(false); // 6자리가 아닐 때는 경고 메시지 숨김
    }
  };

  const handleSubmit = () => {
    if (isBirthValid) {
      onConfirm(birth);
    }
  };

  // 입력한 날짜가 유효한지 판단하는 함수
  const isValidDate = (birthdate: string): boolean => {
    try {
      const year_prefix =
        parseInt(birthdate.substring(0, 2)) > 24 ? '19' : '20';
      const formatted_date = `${year_prefix}${birthdate.substring(
        0,
        2,
      )}-${birthdate.substring(2, 4)}-${birthdate.substring(4, 6)}`;

      new Date(formatted_date);
      return !isNaN(Date.parse(formatted_date));
    } catch {
      return false;
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
      <div className={styles.warning}>
        {showWarning && '유효하지 않은 생년월일입니다.'}
      </div>

      <div className={styles.blank}></div>

      <BottomBtn onClick={handleSubmit} text="확인" disabled={!isBirthValid} />
    </div>
  );
};

export default Birth;
