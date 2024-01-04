import React from 'react';

import styles from './Splash.module.css';

import zipkokIcon from '../../assets/img/zipkokIcon_red.svg';

export default function Splash() {
  return (
    <div className={styles.root}>
      <img className={styles.zipkokIcon} src={zipkokIcon}></img>
      <div className={styles.Label}>내가 살 자취방을 ‘콕’하다</div>
    </div>
  );
}
