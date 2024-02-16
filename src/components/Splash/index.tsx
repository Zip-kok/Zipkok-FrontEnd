import React from 'react';

import zipkokIcon from 'assets/img/login/splashIcon.svg';

import styles from './Splash.module.css';

export default function Splash() {
  return (
    <div className={styles.root}>
      <img src={zipkokIcon} alt="zipkokIcon" />
    </div>
  );
}
