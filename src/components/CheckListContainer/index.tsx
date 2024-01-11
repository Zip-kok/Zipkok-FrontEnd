import React from 'react';
import styles from './CheckListContainer.module.css';

import onIcon from '../../assets/img/checkList/on.svg';
import offIcon from '../../assets/img/checkList/off.svg';
import dragIcon from '../../assets/img/checkList/drag.svg';

interface CheckListContainerProps {
  name: string;
  enabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default function CheckListContainer({
  name,
  enabled = true,
  children,
  onClick,
}: CheckListContainerProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${!enabled ? styles.disabled : ''}`}>
        <div className={styles.headerLeft}>
          <button className="imgBtn" onClick={onClick}>
            <img src={enabled ? onIcon : offIcon}></img>
          </button>
          <span>{name}</span>
        </div>
        <div>
          <img src={dragIcon}></img>
        </div>
      </div>
      <div className={styles.checkListContainer}>{children}</div>
    </div>
  );
}
