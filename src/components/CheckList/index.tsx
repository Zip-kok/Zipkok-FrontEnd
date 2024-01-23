import React from 'react';
import styles from './CheckList.module.css';

import onIcon from 'assets/img/fill/on.svg';
import offIcon from 'assets/img/fill/off.svg';

interface CheckListProps {
  name: string;
  enabled: boolean;
  onClick: () => void;
}

export default function CheckList({
  name,
  enabled = true,
  onClick,
}: CheckListProps) {
  return (
    <div className={`${styles.container} ${!enabled ? styles.disabled : ''}`}>
      <button className="imgBtn" onClick={onClick}>
        <img src={enabled ? onIcon : offIcon}></img>
      </button>
      <span>{name}</span>
    </div>
  );
}
