import React from 'react';
import styles from './CheckListItem.module.css';

import onIcon from 'assets/img/fill/on.svg';
import offIcon from 'assets/img/fill/off.svg';

interface CheckListItemProps {
  name: string;
  enabled: boolean;
  onClick: () => void;
}

export default function CheckListItem({
  name,
  enabled = true,
  onClick,
}: CheckListItemProps) {
  return (
    <div className={`${styles.container} ${!enabled ? styles.disabled : ''}`}>
      <button className="imgBtn" onClick={onClick}>
        <img src={enabled ? onIcon : offIcon}></img>
      </button>
      <span>{name}</span>
    </div>
  );
}
