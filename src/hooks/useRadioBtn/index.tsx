import React, { useState, useCallback } from 'react';

import styles from './RadioBtn.module.css';

export type RadioBtnStyle = 'capsule' | 'icon' | 'round' | 'tag';

export interface Option<T> {
  value: T;
  content: React.ReactNode;
}

export default function useRadioBtn<T extends string>(
  options: Option<T>[],
  style: RadioBtnStyle = 'capsule',
  defaultOption?: T,
) {
  const [value, setValue] = useState<T | undefined>(defaultOption);

  interface RadioBtnProps {
    content: React.ReactNode;
    selected: boolean;
    onClick: () => void;
  }

  const RadioBtn = useCallback(
    ({ content, selected, onClick }: RadioBtnProps) => (
      <button
        onClick={onClick}
        className={`${styles.btn} ${selected ? styles.selected : ''} ${
          styles[style]
        }`}
      >
        {content}
      </button>
    ),
    [style],
  );

  interface RadioBtnContainerProps {
    style?: React.CSSProperties;
    className?: string;
  }
  const RadioBtnContainer = useCallback(
    ({ style, className }: RadioBtnContainerProps) => (
      <div style={style} className={className}>
        {options.map((option) => (
          <RadioBtn
            key={option.value}
            content={option.content}
            selected={option.value === value}
            onClick={() => setValue(option.value)}
          />
        ))}
      </div>
    ),
    [options, value],
  );

  return [RadioBtnContainer, value] as [typeof RadioBtnContainer, typeof value];
}
