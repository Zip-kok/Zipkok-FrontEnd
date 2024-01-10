import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useNaviStore from '../../../../contexts/naviStore';

import styles from './Kok.module.css';

export const KokEdit = () => {
  const { setNaviMenu } = useNaviStore();
  useEffect(() => {
    setNaviMenu('my');
  }, []);

  return <div className={styles.root}>KokEdit</div>;
};
