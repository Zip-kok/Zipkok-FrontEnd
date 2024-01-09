import React from 'react';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';
import styles from './BottomBtn.module.css';
import Btn from '../Btn';

interface BottomBtnProps {
  onClick: () => void;
  text: string;
  onAnchorClick?: () => void;
  anchorText?: string;
  disabled?: boolean;
}

export default function BottomBtn({
  onClick,
  text,
  onAnchorClick,
  anchorText = '',
  disabled = false,
}: BottomBtnProps) {
  console.assert(
    anchorText === '' || onAnchorClick !== undefined,
    'onAnchorClick must be provided if anchorText is provided',
  );

  const isKeyboardOpen = useDetectKeyboardOpen();

  return (
    <div className={`${styles.container} ${isKeyboardOpen ? styles.full : ''}`}>
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
      />
    </div>
  );
}
