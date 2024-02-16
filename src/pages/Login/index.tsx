import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import kakaoIcon from 'assets/img/login/kakaoIcon.svg';
import zipkokIcon from 'assets/img/login/loginIcon.svg';
import { Splash } from 'components';

import styles from './Login.module.css';

export default function Login() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  function handleLogin() {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?client_id=f251abb4b1d323c283685a7be4211aa4&redirect_uri=https://localhost:3000/auth&response_type=code';
  }

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
          <button className={styles.loginBtn} onClick={handleLogin}>
            <img src={kakaoIcon} alt="kakaoIcon" />
            <div>카카오 로그인</div>
          </button>
          <Link to="/">
            <button className={styles.notLoginBtn}>로그인 없이 둘러보기</button>
          </Link>
        </>
      )}
    </div>
  );
}
