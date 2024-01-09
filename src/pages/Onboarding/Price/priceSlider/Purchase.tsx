import React from 'react';
import RangeSlider from '../../../../components/RangeSlider';
import getPriceLabelString from './getPriceLabelString';
import styles from './priceSlider.module.css';

interface PurchaseProps {
  onChange: (rangeStart: number, rangeEnd: number) => void;
}

export default function Purchase({ onChange }: PurchaseProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <h1>매매가</h1>
        <RangeSlider
          min={0}
          max={1_000_000_000}
          step={1_000_000}
          defaultRangeStart={0}
          defaultRangeEnd={120_000_000}
          onChange={onChange}
          markers={[100_000_000, 250_000_000]}
          label={getPriceLabelString}
        />
      </div>
    </div>
  );
}
