import React from 'react';
import styles from './KokItem.module.css';
import data from 'models/kokItemInner.json';
import { OptionsComponent } from 'components';

const insideHome = () => {
  const { furnitureOptions, direction, options } = data.result;

  return (
    <div className={styles.body}>
      <div className={styles.furnitureCtn}>
        {furnitureOptions.map((tag, index) => (
          <p className={styles.furniture} key={index}>
            {tag}
          </p>
        ))}
      </div>
      <div className={styles.directCtn}>
        <h4>집 방향</h4>
        <input type="text" placeholder={direction} />
      </div>

      <div className={styles.optionsCtn}>
        <OptionsComponent optionData={options} />
      </div>
      <div className={styles.blank} />
      <div className={styles.blank} />
    </div>
  );
};

export default insideHome;
