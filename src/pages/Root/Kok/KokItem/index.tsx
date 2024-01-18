import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './KokItem.module.css';

export default function KokItem() {
  const { kokId } = useParams<{ kokId: string }>();
  return <div className={styles.root}></div>;
}
