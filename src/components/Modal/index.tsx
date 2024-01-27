import React from 'react';

import styles from './Modal.module.css';

interface ModalProps {
  title: string;
  description?: string;
  secondaryButton?: string;
  primaryButton: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick?: () => void;
}

export default function Modal({
  title,
  description,
  secondaryButton,
  primaryButton,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: ModalProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.buttonContainer}>
        {secondaryButton && (
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={onSecondaryButtonClick}
          >
            {secondaryButton}
          </button>
        )}
        <button
          className={`${styles.button} ${styles.primary}`}
          onClick={onPrimaryButtonClick}
        >
          {primaryButton}
        </button>
      </div>
    </div>
  );
}
