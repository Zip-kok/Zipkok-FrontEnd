import React from 'react';

import { OptionsComponent } from 'components';
import Furnitures from 'components/Furnitures';
import data from 'models/kokItemInner.json';

import styles from '../KokItem.module.css';

const insideHome = () => {
  const { furnitureOptions, direction, options } = data.result;

  const filteredFurnitures = Furnitures.filter((furniture) =>
    furnitureOptions.includes(furniture.name),
  );

  return (
    <div className={styles.content}>
      <div className={styles.furnitureCtn}>
        {filteredFurnitures.map((tag, index) => (
          <p className={styles.furniture} key={index}>
            <img src={tag.img} />
            {tag.name}
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
