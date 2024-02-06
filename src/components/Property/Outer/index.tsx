import React from 'react';

import { OptionsComponent } from 'components';

import styles from './Outer.module.css';

interface OuterProps {
  highlights: string[];
  options: {
    option: string;
    orderNumber: number;
    detailOptions: string[];
  }[];
}

export default function Outer({ highlights, options }: OuterProps) {
  return (
    <>
      <div className={styles.TagCtn}>
        {highlights.map((tag, index) => (
          <div className={styles.tag} key={index}>
            {tag}
          </div>
        ))}
      </div>

      <div className={styles.optionsCtn}>
        <OptionsComponent optionData={options} readOnly={true} />
      </div>
    </>
  );
}
