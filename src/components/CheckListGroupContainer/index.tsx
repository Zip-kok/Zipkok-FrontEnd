import React from 'react';
import styles from './CheckListGroupContainer.module.css';

interface CheckListGroupContainerProps {
  children: React.ReactNode;
}

export default function CheckListGroupContainer({
  children,
}: CheckListGroupContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
