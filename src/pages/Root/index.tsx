import React from 'react';

import NaviBar from '../../components/NaviBar';

import styles from './Root.module.css';

export default function Root() {
  return (
    <div className={styles.root}>
      <NaviBar />
    </div>
  );
}
