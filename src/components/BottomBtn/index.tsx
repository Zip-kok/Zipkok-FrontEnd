import React from 'react';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';
import styles from './BottomBtn.module.css';
import Btn from '../Btn';

interface BottomBtnProps {
  onClick: () => void;
  text: string;
  occupySpace?: boolean;
  onAnchorClick?: () => void;
  icon?: React.ReactNode;
  anchorText?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function BottomBtn({
  onClick,
  text,
  occupySpace = false,
  onAnchorClick,
  anchorText = '',
  icon,
  disabled = false,
  style,
}: BottomBtnProps) {
  console.assert(
    anchorText === '' || onAnchorClick !== undefined,
    'onAnchorClick must be provided if anchorText is provided',
  );

  const isKeyboardOpen = useDetectKeyboardOpen();

  return (
    <div
      style={style}
      className={`${styles.container} ${
        occupySpace ? styles.occupySpace : ''
      } ${isKeyboardOpen ? styles.full : ''}`}
    >
      {anchorText !== '' && (
        <a className={styles.anchor} onClick={onAnchorClick}>
          {anchorText}
        </a>
      )}
      <Btn
        onClick={onClick}
        text={text}
        isKeyboardOpen={isKeyboardOpen}
        disabled={disabled}
        icon={icon}
      />
    </div>
  );
}
