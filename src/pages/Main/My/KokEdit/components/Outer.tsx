import React from 'react';

import { Highlight } from 'components';

import OptionContainer from './OptionContainer';
import styles from '../KokEdit.module.css';

import type { KokOption } from 'types/KokOption';

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

interface OuterProps {
  highlights: string[];
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
  options: KokOption[];
  setOptions: React.Dispatch<React.SetStateAction<KokOption[]>>;
}

const Outer = ({
  highlights,
  setHighlights,
  options,
  setOptions,
}: OuterProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.highlightContainer}>
        <h1>매물 하이라이트</h1>
        <div>
          {high.map((highlight) => (
            <Highlight
              key={highlight}
              text={highlight}
              highlightEnabled={highlights.includes(highlight)}
              onChange={(enabled) => {
                if (enabled) setHighlights((prev) => [...prev, highlight]);
                else
                  setHighlights((prev) => prev.filter((h) => h !== highlight));
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.checkListGroupContainer}>
        <OptionContainer options={options} setOptions={setOptions} />
      </div>
    </div>
  );
};

export default Outer;
