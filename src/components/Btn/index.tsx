import React from 'react';
import styles from './Btn.module.css';

interface BtnProps {
  onClick?: () => void;
  text: string;
  isKeyboardOpen?: boolean;
  disabled?: boolean;
}

export default function Btn({
  onClick,
  text,
  isKeyboardOpen,
  disabled,
}: BtnProps) {
  return (
    <button
      className={`${styles.btn} ${!isKeyboardOpen ? styles.round : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
}
