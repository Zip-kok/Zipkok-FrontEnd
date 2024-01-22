import React from 'react';
import Lottie from 'lottie-react';

import styles from './CompleteAnim.module.css';
import checkLottie from 'assets/Lottie/checkLottie.json';

interface CompleteProps {
  title: string;
  subtitle?: string;
}

export default function CompleteAnim({ title, subtitle }: CompleteProps) {
  return (
    <div className={styles.container}>
      <Lottie
        className={styles.animation}
        animationData={checkLottie}
        loop={false}
      />
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
    </div>
  );
}
