import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { signIn } from 'apis';
import leftArrowIcon from 'assets/img/line(2)/left_arrow.svg';
import useEmailStore from 'contexts/emailStore';
import { StatusCode } from 'types/StatusCode';

import Birth from './Birth';
import Complete from './Complete';
import Gender from './Gender';
import NickName from './NickName';
import styles from './SignIn.module.css';

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
          handleFinalSubmit(nickname, gender, birth);
        }}
      />
    ),

    // complete
    complete: <Complete />,
  };

  // 서버에 최종 데이터 전송
  const handleFinalSubmit = useCallback(
    (nickname: string, gender: Gender, birth: Date) => {
      signIn(nickname, 'KAKAO', email, gender, birth)
        .then((res) => {
          switch (res.code) {
            // 성공적으로 회원가입 성공
            case StatusCode.REGISTRATION_SUCCESS:
              setStep('complete');
              break;
            // 닉네임이 없거나 잘못된 형식
            case StatusCode.INVALID_NICKNAME_FORMAT:
              alert(res.message);
              setStep('nickname');
              break;
            // 성별이 없거나 잘못된 형식
            case StatusCode.INVALID_GENDER_FORMAT:
              alert(res.message);
              setStep('gender');
              break;
            // 생년월일이 없거나 잘못된 형식
            case StatusCode.INVALID_BIRTHDAY_FORMAT:
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
    },
    [],
  );

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
