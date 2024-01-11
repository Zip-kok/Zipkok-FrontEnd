import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';

import kakaoIcon from '../../assets/img/login/kakaoIcon.svg';
import zipkokIcon from '../../assets/img/login/zipkokIcon_white.svg';
import Splash from '../../components/Splash';

export default function Login() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.root}>
      {showSplash ? (
        <Splash />
      ) : (
        <>
          <img
            className={styles.zipkokIcon}
            src={zipkokIcon}
            alt="zipkokIcon"
          />
          <Link to="/signin">
            <button className={styles.loginBtn}>
              <img src={kakaoIcon} alt="kakaoIcon" />
              <div>카카오 로그인</div>
            </button>
          </Link>
          <Link to="/">
            <button className={styles.notLoginBtn}>로그인 없이 둘러보기</button>
          </Link>
        </>
      )}
    </div>
  );
}
