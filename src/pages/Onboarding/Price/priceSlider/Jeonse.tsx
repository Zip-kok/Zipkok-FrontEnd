import React from 'react';
import RangeSlider from '../../../../components/RangeSlider';
import getPriceLabelString from './getPriceLabelString';
import styles from './priceSlider.module.css';

interface JeonseProps {
  onChange: (rangeStart: number, rangeEnd: number) => void;
}

export default function Jeonse({ onChange }: JeonseProps) {
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
          onChange={onChange}
          markers={[50_000_000, 250_000_000]}
          label={getPriceLabelString}
        />
      </div>
    </div>
  );
}
