import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useNaviStore from 'contexts/naviStore';

import styles from './KokItem.module.css';

export default function KokItem() {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(true);
  }, []);

  const { kokId } = useParams<{ kokId: string }>();

  return <div className={styles.root}></div>;
}
