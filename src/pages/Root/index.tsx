import React from 'react';
import { Outlet } from 'react-router-dom';

import NaviBar from '../../components/NaviBar';

import styles from './Root.module.css';

export default function Root() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <NaviBar />
    </div>
  );
}
