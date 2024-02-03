import React from 'react';

import { OptionsComponent, Furnitures } from 'components';

import styles from './Inner.module.css';

interface InnerProps {
  furnitureOptions: string[];
  direction: string;
  options: {
    option: string;
    orderNumber: number;
    detailOptions: string[];
  }[];
}

export default function Inner({
  furnitureOptions,
  direction,
  options,
}: InnerProps) {
  const filteredFurnitures = Furnitures.filter((furniture) =>
    furnitureOptions.includes(furniture.name),
  );

  return (
    <>
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
        <input type="text" value={direction} readOnly={true} />
      </div>

      <div className={styles.optionsCtn}>
        <OptionsComponent optionData={options} readOnly={true} />
      </div>
      <div className={styles.blank} />
      <div className={styles.blank} />
    </>
  );
}
