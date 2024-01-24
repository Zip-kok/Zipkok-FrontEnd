import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

import styles from './Home.module.css';

export default function Home() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: false,
      naviEnabled: true,
      path: 'home',
    }));
  }, []);

  const navigate = useNavigate();

  return <div className={styles.root}>홈</div>;
}
