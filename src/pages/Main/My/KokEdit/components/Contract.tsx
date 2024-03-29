import React from 'react';

import OptionContainer from './OptionContainer';
import styles from '../KokEdit.module.css';

import type { KokOption } from 'types/KokOption';

interface OuterProps {
  options: KokOption[];
  setOptions: React.Dispatch<React.SetStateAction<KokOption[]>>;
}

const Outer = ({ options, setOptions }: OuterProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.checkListGroupContainer}>
        <OptionContainer options={options} setOptions={setOptions} />
      </div>
    </div>
  );
};

export default Outer;
