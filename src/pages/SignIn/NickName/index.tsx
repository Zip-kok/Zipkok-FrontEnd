import React, { useState } from 'react';

import styles from './NickName.module.css';

import BottomBtn from '../../../components/BottomBtn';
import LoginInput from '../../../components/LoginInput';

interface NickNameProps {
  onConfirm: (nickname: string) => void;
}

export default function NickName({ onConfirm }: NickNameProps) {
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNotNicknameExist, setIsNotNicknameExist] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setNickname(value);
    setIsNicknameValid(value.length >= 1 && value.length <= 12);
    setIsNotNicknameExist(true);
  };

  const handleSubmit = () => {
    if (!isNicknameValid) {
      return;
    }

    // 닉네임이 중복되지 않았을 시
    if (true) {
      setIsNotNicknameExist(true);
    } else {
      setIsNotNicknameExist(false);
      return;
    }

    onConfirm(nickname);
  };

  const hnadleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          사용하실 닉네임을
          <br />
          입력해주세요.
        </h1>
      </div>

      <LoginInput
        value={nickname}
        placeholder="최대 12자"
        onChange={handleInputChange}
        onFocus={hnadleInputFocus}
        onBlur={handleInputBlur}
        maxLength={12}
      />

      <div className={styles.warning}>
        {isInputFocused &&
          !isNicknameValid &&
          '닉네임은 1자 이상 12자 이하여야 합니다.'}

        {!isNotNicknameExist && '이미 존재하는 닉네임입니다.'}
      </div>

      <div className={styles.blank}></div>

      <BottomBtn
        onClick={handleSubmit}
        text="확인"
        disabled={!isNicknameValid || !isNotNicknameExist}
      />
    </div>
  );
}
