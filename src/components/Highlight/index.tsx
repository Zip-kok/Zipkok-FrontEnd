import React, { useState } from 'react';

import styles from '../Highlight/styles.module.css';

import plusIcon from '../../assets/img/plus.svg';
import minusIcon from '../../assets/img/minus.svg';

interface HighlightProps {
  text: string;
  onEnable: () => void;
  onDisable: () => void;
  highlightEnabled?: boolean;
}

const IconTextBtn = ({
  text,
  onEnable,
  onDisable,
  highlightEnabled = false,
}: HighlightProps) => {
  const [enabled, setEnabled] = useState(highlightEnabled);

  const handleClick = () => {
    if (enabled) {
      setEnabled(false);
      onDisable();
    } else {
      setEnabled(true);
      onEnable();
    }
  };

  return (
    <button
      className={`${styles.container} ${
        enabled ? styles.enabeld : styles.disabled
      }`}
      onClick={handleClick}
    >
      <span>{text}</span>
      {enabled ? <img src={minusIcon}></img> : <img src={plusIcon}></img>}
    </button>
  );
};

export default IconTextBtn;
