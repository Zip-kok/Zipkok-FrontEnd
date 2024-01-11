import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Root.module.css';

export default function Root() {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
}
