import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

import styles from './RecentlyView.module.css';

const RecentlyView = () => {
  const navigate = useNavigate();
  const ui = useUIStore();

  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '최근 본 매물',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'my',
    });
  }, []);
  return <div className={styles.root}>index</div>;
};

export default RecentlyView;
