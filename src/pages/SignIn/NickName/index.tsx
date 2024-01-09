import React, { useState } from 'react';
import BottomBtn from '../../../components/BottomBtn';
import LoginInput from '../../../components/LoginInput';
import styles from './NickName.module.css';

interface NickNameProps {
  onConfirm: () => void;
}

export default function NickName({ onConfirm }: NickNameProps) {
  const [nickname, setNickname] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNotNicknameExist, setIsNotNicknameExist] = useState(true);
  const [isTouched, setIsTouched] = useState(false); // 입력이 시작되었는지 추적하기 위한 상태

  const handleInputChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const inputVal = e.currentTarget.value;
    if (!isTouched) setIsTouched(true); // 사용자가 입력을 시작하면 isTouched를 true로 설정
    setNickname(inputVal);
    setIsNicknameValid(inputVal.length >= 1 && inputVal.length <= 12);
  };

  const handleSubmit = () => {
    if (!isNicknameValid) {
      return;
    }
    onConfirm();
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
      />
      {isTouched && !isNicknameValid && (
        <div className={styles.warning}>닉네임은 최대 12자까지 가능합니다.</div>
      )}
      {!isNotNicknameExist && (
        <div className={styles.warning}>이미 존재하는 닉네임입니다.</div>
      )}
      <div className={styles.wrapper}>
        <BottomBtn
          onClick={handleSubmit}
          text="확인"
          disabled={!isNicknameValid || !isNotNicknameExist}
        />
      </div>
    </div>
  );
}
