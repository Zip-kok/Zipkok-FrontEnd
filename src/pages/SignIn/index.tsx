import React, { useState } from 'react';
import styles from './SignIn.module.css';

import Birth from './Birth';
import Complete from './Complete';
import Gender from './Gender';
import NickName from './NickName';

import leftArrowIcon from '../../assets/img/left_arrow.svg';

// nickname: 회원가입_01_닉네임
// gender: 회원가입_02_성별
// birth: 회원가입_03_생년월일
// complete: 회원가입_04_완료
type Step = 'nickname' | 'gender' | 'birth' | 'complete';
export type Gender = '남자' | '여자' | '비공개' | null;

export default function SignIn() {
  const [step, setStep] = useState<Step>('nickname');
  const steps: Record<Step, JSX.Element> = {
    // nickname
    nickname: (
      <NickName
        onConfirm={(nickname: string) => {
          setStep('gender');
        }}
      />
    ),

    // gender
    gender: (
      <Gender
        onConfirm={(gender: Gender) => {
          setStep('birth');
        }}
      />
    ),

    // birth
    birth: (
      <Birth
        onConfirm={(birth: number) => {
          setStep('complete');
        }}
      />
    ),

    // complete
    complete: <Complete />,
  };

  // 뒤로 가기 버튼을 표시할지 여부
  function backBtnEnabled(step: Step) {
    if (step === 'nickname') {
      return false;
    } else if (step === 'complete') {
      return false;
    } else {
      return true;
    }
  }

  // 뒤로 가기 버튼을 눌렀을 때
  function handleBackClick() {
    if (step === 'gender') {
      setStep('nickname');
    } else if (step === 'birth') {
      setStep('gender');
    }
  }

  return (
    <div className={styles.root}>
      {/* 상단 바 */}
      {backBtnEnabled(step) && (
        <div className={styles.topBar}>
          <button className="imgBtn" onClick={handleBackClick}>
            <img className={styles.leftArrowIcon} src={leftArrowIcon}></img>
          </button>
        </div>
      )}

      {/* 콘텐츠 */}
      <div className={styles.content}>{steps[step]}</div>
    </div>
  );
}
