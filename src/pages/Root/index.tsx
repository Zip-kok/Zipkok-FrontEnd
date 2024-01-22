import React from 'react';
import { Outlet } from 'react-router-dom';

import useNaviStore from 'contexts/naviStore';
import { NaviBar } from 'components';

import styles from './Root.module.css';

export default function Root() {
  const [showNaviBar] = useNaviStore((state) => [state.showNaviBar]);

  return (
    <div className={`${styles.root} ${showNaviBar ? styles.padded : ''}`}>
      <div className={styles.content}>
        <Outlet />
      </div>
      {showNaviBar && <NaviBar />}
    </div>
  );
}
