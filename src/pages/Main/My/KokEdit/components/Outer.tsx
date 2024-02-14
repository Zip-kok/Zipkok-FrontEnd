import React from 'react';

import { Highlight } from 'components';

import OptionContainer from './OptionContainer';
import styles from '../KokEdit.module.css';

import type { KokOption } from 'types/KokOption';

interface OuterProps {
  highlights: string[];
  options: KokOption[];
  setOptions: React.Dispatch<React.SetStateAction<KokOption[]>>;
}

const Outer = ({ highlights, options, setOptions }: OuterProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.highlightContainer}>
        <h1>매물 하이라이트</h1>
        <div>
          {highlights.map((highlight) => (
            <Highlight key={highlight} text={highlight} highlightEnabled />
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
