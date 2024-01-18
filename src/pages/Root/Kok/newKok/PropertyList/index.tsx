import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useNaviStore from '../../../../../contexts/naviStore';

import styles from './PropertyList.module.css';

export default function PropertyList() {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(true);
  }, []);

  return <div className={styles.root}></div>;
}
