import React from 'react';

import { OptionsComponent } from 'components';
import data from 'models/kokItemOuter.json';

import styles from './KokItem.module.css';

const NearHome = () => {
  const { highlights, options } = data.result;

  return (
    <div className={styles.body}>
      <div className={styles.TagCtn}>
        {highlights.map((tag, index) => (
          <p className={styles.tag} key={index}>
            {tag}
          </p>
        ))}
      </div>

      <div className={styles.optionsCtn}>
        <OptionsComponent optionData={options} />
      </div>

      <div className={styles.blank} />
      <div className={styles.blank} />
    </div>
  );
};

export default NearHome;
