import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useNaviStore from '../../../contexts/naviStore';

import styles from './Kok.module.css';

export const Kok = () => {
  const { setNaviMenu } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
  }, []);

  return <div className={styles.root}>콕리스트</div>;
};