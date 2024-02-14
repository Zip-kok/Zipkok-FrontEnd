import React from 'react';

import offIcon from 'assets/img/fill/off.svg';
import onIcon from 'assets/img/fill/on.svg';

import styles from './DetailOption.module.css';

interface DetailOptionProps {
  name: string;
  enabled: boolean;
  onClick: () => void;
}

export default function DetailOption({
  name,
  enabled = true,
  onClick,
}: DetailOptionProps) {
  return (
    <div className={`${styles.container} ${!enabled ? styles.disabled : ''}`}>
      <button className="imgBtn" onClick={onClick}>
        <img src={enabled ? onIcon : offIcon}></img>
      </button>
      <span>{name}</span>
    </div>
  );
}
