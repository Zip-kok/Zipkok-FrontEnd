import React from 'react';

import { RangeSlider } from 'components';

import getPriceLabelString from './getPriceLabelString';
import styles from './priceSlider.module.css';
import { PriceRange } from '../../';

interface PurchaseProps {
  onChange: (rangeStart: number, rangeEnd: number) => void;
  defaultValues: PriceRange[];
}

export default function Purchase({ onChange, defaultValues }: PurchaseProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <h1>매매가</h1>
        <RangeSlider
          min={0}
          max={1_000_000_000}
          defaultRangeStart={defaultValues[0][0]}
          defaultRangeEnd={defaultValues[0][1]}
          onChange={onChange}
          markers={[100_000_000, 250_000_000]}
          priceToString={getPriceLabelString}
          scaleMethod="square"
        />
      </div>
    </div>
  );
}
