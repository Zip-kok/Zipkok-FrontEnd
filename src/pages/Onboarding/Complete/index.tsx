import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';

import styles from './Complete.module.css';

import BottomBtn from '../../../components/BottomBtn';

import checkLottie from '../../../assets/Lottie/checkLottie.json';

export default function Complete() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <Lottie
        className={styles.animation}
        animationData={checkLottie}
        loop={false}
      />
      <div className={styles.textContainer}>
        <p className={styles.completeText}>키워드 설정을 완료했어요!</p>
        <p className={styles.detailText}>
          선택한 내용은
          <br />
          마이페이지에서 수정 가능해요
        </p>
      </div>
      <BottomBtn onClick={handleClick} text="홈으로 돌아가기" />
    </div>
  );
}
