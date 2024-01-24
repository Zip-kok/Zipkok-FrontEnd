import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useUIStore();
  useEffect(() => {
    setNaviMenu('home');
    setShowNaviBar(true);
  }, []);

  return <div className={styles.root}>홈</div>;
}
