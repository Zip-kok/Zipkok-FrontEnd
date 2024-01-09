import React from 'react';
import RangeSlider from '../../../../components/RangeSlider';
import getPriceLabelString from './getPriceLabelString';
import styles from './priceSlider.module.css';

interface MonthlyProps {
  onChange1: (rangeStart: number, rangeEnd: number) => void;
  onChange2: (rangeStart: number, rangeEnd: number) => void;
}

export default function Monthly({ onChange1, onChange2 }: MonthlyProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <h1>보증금</h1>
        <RangeSlider
          min={0}
          max={1_000_000_000}
          step={1_000_000}
          defaultRangeStart={0}
          defaultRangeEnd={60_000_000}
          onChange={onChange1}
          markers={[50_000_000, 250_000_000]}
          label={getPriceLabelString}
        />
      </div>

      <div className={styles.sliderContainer}>
        <h1>월세</h1>
        <RangeSlider
          min={0}
          max={30_000_000}
          step={50_000}
          defaultRangeStart={0}
          defaultRangeEnd={400_000}
          onChange={onChange2}
          markers={[350_000, 1_500_000]}
          label={getPriceLabelString}
        />
      </div>
    </div>
  );
}
