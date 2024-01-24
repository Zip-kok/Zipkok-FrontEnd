import React from 'react';

import zipkokIcon from 'assets/img/login/zipkokIcon_red.svg';

import styles from './Splash.module.css';

export default function Splash() {
  return (
    <div className={styles.root}>
      <img className={styles.zipkokIcon} src={zipkokIcon}></img>
      <div className={styles.Label}>내가 살 자취방을 ‘콕’하다</div>
    </div>
  );
}
