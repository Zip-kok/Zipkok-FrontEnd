import React, { useState } from 'react';

import minusIcon from 'assets/img/fill/minus.svg';
import plusIcon from 'assets/img/fill/plus.svg';

import styles from './Highlight.module.css';
const high = [
  'CCTV',
  '주변공원',
  '현관보안',
  '편세권',
  '주차장',
  '역세권',
  '더블역세권',
  '트리플역세권',
];
interface HighlightProps {
  text: string;
  highlightEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

const Highlight = ({ text, highlightEnabled, onChange }: HighlightProps) => {
  return (
    <button
      className={`${styles.container} ${
        highlightEnabled ? styles.enabled : styles.disabled
      }`}
      onClick={() => onChange(!highlightEnabled)}
    >
      <span>{text}</span>
      {highlightEnabled ? (
        <img src={minusIcon}></img>
      ) : (
        <img src={plusIcon}></img>
      )}
    </button>
  );
};

export default Highlight;
