import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

import styles from './HomeItem.module.css';
import BottomSheet from '../HomeItem/components/BottomSheet';

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

  return (
    <div className={styles.root}>
      {/* Search Box */}
      <div className={styles.searchBox}></div>

      {/* BaseLayer  -> 지도 */}

      {/* BottomSheet */}
      <BottomSheet />
    </div>
  );
}
