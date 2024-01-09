import React from 'react';
import RangeSlider from '../../../../components/RangeSlider';
import getPriceLabelString from './getPriceLabelString';
import styles from './priceSlider.module.css';

import { PriceRange } from '../../';

interface JeonseProps {
  onChange: (rangeStart: number, rangeEnd: number) => void;
  defaultValues: PriceRange[];
}

export default function Jeonse({ onChange, defaultValues }: JeonseProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <h1>보증금</h1>
        <RangeSlider
          min={0}
          max={1_000_000_000}
          defaultRangeStart={defaultValues[0][0]}
          defaultRangeEnd={defaultValues[0][1]}
          onChange={onChange}
          markers={[50_000_000, 250_000_000]}
          priceToString={getPriceLabelString}
          scaleMethod="square"
        />
      </div>
    </div>
  );
}
