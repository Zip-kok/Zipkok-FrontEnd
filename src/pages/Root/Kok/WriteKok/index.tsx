import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useNaviStore from '../../../../contexts/naviStore';

import styles from './WriteKok.module.css';

export default function KokItem() {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(true);
  }, []);

  // kokId가 undefined이면 새로운 콕리스트 등록
  // kokId가 있으면 해당 콕리스트 수정
  const { kokId } = useParams<{ kokId: string }>();

  return <div className={styles.root}></div>;
}
