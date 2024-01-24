import React, { useState } from 'react';

import { BottomBtn, TextInput } from 'components';

import styles from './NickName.module.css';

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
    }

    onConfirm(nickname);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  function caption() {
    if (isInputFocused) {
      if (!isNicknameValid) {
        return '닉네임은 1자 이상 12자 이하여야 합니다.';
      } else if (!isNotNicknameExist) {
        return '이미 존재하는 닉네임입니다.';
      }
    }
    return undefined;
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          사용하실 닉네임을
          <br />
          입력해주세요.
        </h1>
      </div>

      <div className={styles.inputContainer}>
        <TextInput
          value={nickname}
          placeholder="최대 12자"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onSubmit={handleSubmit}
          maxLength={12}
          caption={caption()}
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
        disabled={!isNicknameValid || !isNotNicknameExist}
        occupySpace
      />
    </div>
  );
}
