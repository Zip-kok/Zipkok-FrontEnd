import React, { useState } from 'react';

import styles from './SignIn.module.css';

import useEmailStore from 'contexts/emailStore';

import Birth from './Birth';
import Complete from './Complete';
import Gender from './Gender';
import NickName from './NickName';

import leftArrowIcon from 'assets/img/line(2)/left_arrow.svg';
import { useNavigate } from 'react-router-dom';

// nickname: 회원가입_01_닉네임
// gender: 회원가입_02_성별
// birth: 회원가입_03_생년월일
// complete: 회원가입_04_완료
type Step = 'nickname' | 'gender' | 'birth' | 'complete';
export type Gender = '남자' | '여자' | '비공개';

export default function SignIn() {
  const [step, setStep] = useState<Step>('nickname');
  const navigate = useNavigate();

  const email = useEmailStore((store) => store.email);
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<Gender>('남자');
  const [birth, setBirth] = useState<Date>(new Date());

  const steps: Record<Step, JSX.Element> = {
    // nickname
    nickname: (
      <NickName
        onConfirm={(nickname: string) => {
          setNickname(nickname);
          setStep('gender');
        }}
      />
    ),

    // gender
    gender: (
      <Gender
        onConfirm={(gender: Gender) => {
          setGender(gender);
          setStep('birth');
        }}
      />
    ),

    // birth
    birth: (
      <Birth
        onConfirm={(birth: Date) => {
          setBirth(birth);
          handleFinalSubmit();
        }}
      />
    ),

    // complete
    complete: <Complete />,
  };

  // 서버에 최종 데이터 전송
  function handleFinalSubmit() {
    const res = fetch('https://zipkok.store/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        oauthProvider: 'KAKAO',
        email,
        gender,
        brith: birth.toISOString().slice(2, 10).replace(/-/g, ''),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        switch (res.code) {
          // 성공적으로 회원가입 성공
          case 5002:
            setStep('complete');
            break;
          // 닉네임이 없거나 잘못된 형식
          case 5008:
            alert(res.message);
            setStep('nickname');
            break;
          // 성별이 없거나 잘못된 형식
          case 5009:
            alert(res.message);
            setStep('gender');
            break;
          // 생년월일이 없거나 잘못된 형식
          case 5010:
            alert(res.message);
            setStep('birth');
            break;
          default:
            alert(res.message);
            break;
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // 상단 바 및 뒤로 가기 버튼을 표시할지 여부
  function topBarEnabled(step: Step) {
    if (step === 'complete' || step === 'nickname') {
      return false;
    } else {
      return true;
    }
  }

  // 뒤로 가기 버튼을 눌렀을  때
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
      {topBarEnabled(step) && (
        <div className={styles.topBar}>
          <button className="imgBtn" onClick={handleBackClick}>
            <img src={leftArrowIcon}></img>
          </button>
        </div>
      )}

      {/* 콘텐츠 */}
      <div
        className={`${styles.content} ${
          !topBarEnabled(step) ? styles.full : ''
        }`}
      >
        {steps[step]}
      </div>
    </div>
  );
}
