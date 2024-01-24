import React, { useState } from 'react';

import minusIcon from 'assets/img/fill/minus.svg';
import plusIcon from 'assets/img/fill/plus.svg';

import styles from './Highlight.module.css';

interface HighlightProps {
  text: string;
  onEnable?: () => void;
  onDisable?: () => void;
  highlightEnabled?: boolean;
}

const Highlight = ({
  text,
  onEnable,
  onDisable,
  highlightEnabled = false,
}: HighlightProps) => {
  const [enabled, setEnabled] = useState(highlightEnabled);

  const handleClick = () => {
    if (enabled) {
      setEnabled(false);
      onEnable?.();
    } else {
      setEnabled(true);
      onDisable?.();
    }
  };

  return (
    <button
      className={`${styles.container} ${
        enabled ? styles.enabled : styles.disabled
      }`}
      onClick={handleClick}
    >
      <span>{text}</span>
      {enabled ? <img src={minusIcon}></img> : <img src={plusIcon}></img>}
    </button>
  );
};

export default Highlight;
