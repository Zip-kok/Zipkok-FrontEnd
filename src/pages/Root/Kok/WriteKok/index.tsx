import React from 'react';
import { useParams } from 'react-router-dom';

import styles from './WriteKok.module.css';

export default function KokItem() {
  // kokId가 undefined이면 새로운 콕리스트 등록
  // kokId가 있으면 해당 콕리스트 수정
  const { kokId } = useParams<{ kokId: string }>();

  return <div className={styles.root}></div>;
}
