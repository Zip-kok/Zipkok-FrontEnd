import React, { memo } from 'react';
import styles from './CheckListGroup.module.css';

import onIcon from '../../assets/img/fill/on.svg';
import offIcon from '../../assets/img/fill/off.svg';
import dragIcon from '../../assets/img/line(1)/drag.svg';

export interface CheckListGroupProps {
  name: string;
  enabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default function CheckListGroup({
  name,
  enabled = true,
  children,
  onClick,
}: CheckListGroupProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${!enabled ? styles.disabled : ''}`}>
        <div className={styles.headerLeft}>
          <button className="imgBtn" onClick={onClick}>
            <img src={enabled ? onIcon : offIcon}></img>
          </button>
          <span>{name}</span>
        </div>
        <div className={styles.drag}>
          <img src={dragIcon} draggable={false}></img>
        </div>
      </div>
      <div className={styles.checkListContainer}>{children}</div>
    </div>
  );
}
export const handleClass = styles.drag;
