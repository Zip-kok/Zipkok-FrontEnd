import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useNaviStore from '../../../contexts/naviStore';

import styles from './Home.module.css';

export const Home = () => {
  const { setNaviMenu } = useNaviStore();
  useEffect(() => {
    setNaviMenu('home');
  }, []);

  return <div className={styles.root}>홈</div>;
};
