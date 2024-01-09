import React, { useState, useRef } from 'react';
import styles from './RangeSlider.module.css';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  defaultRangeStart: number;
  defaultRangeEnd: number;
  markers?: number[];
  priceToString?: (number: number) => string;
  onChange: (rangeStart: number, rangeEnd: number) => void;
}

export default function RangeSlider({
  min,
  max,
  step,
  defaultRangeStart,
  defaultRangeEnd,
  markers = [],
  priceToString: label = (number) => number.toLocaleString(),
  onChange,
}: RangeSliderProps) {
  const sliderRef1 = useRef<HTMLInputElement>(null);
  const sliderRef2 = useRef<HTMLInputElement>(null);

  const [start, setStart] = useState<number>(defaultRangeStart);
  const [end, setEnd] = useState<number>(defaultRangeEnd);

  function getLeftStyle(value: number) {
    return `calc((((${value} - ${min}) / ${max - min}) * (100% - 24px) + 12px)`;
  }

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    const slider1 = sliderRef1.current;
    const slider2 = sliderRef2.current;

    if (e.target === slider1) {
      const oppositeValue = slider2!.valueAsNumber;
      if (value > oppositeValue) {
        setStart(oppositeValue);
        setEnd(value);
      } else {
        setStart(value);
        setEnd(oppositeValue);
      }
    } else {
      const oppositeValue = slider1!.valueAsNumber;
      if (value < oppositeValue) {
        setStart(value);
        setEnd(oppositeValue);
      } else {
        setStart(oppositeValue);
        setEnd(value);
      }
    }

    onChange(start, end);
  }

  return (
    <div className={styles.container}>
      {/* range input thumb 위에 있는 input의 현재 값 표시 */}
      <div
        className={styles.label}
        style={{
          left: getLeftStyle(start),
        }}
      >
        {label(start)}
      </div>
      <div
        className={styles.label}
        style={{
          left: getLeftStyle(end),
        }}
      >
        {label(end)}
      </div>

      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultRangeStart}
        onChange={handleSliderChange}
        ref={sliderRef1}
      />
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultRangeEnd}
        onChange={handleSliderChange}
        ref={sliderRef2}
      />

      <div className={styles.sliderBackground}></div>
      <div
        className={styles.sliderForeground}
        style={{
          left: `${(start / max) * 100}%`,
          width: `${((end - start) / max) * 100}%`,
        }}
      ></div>

      {markers.map((value) => (
        <div
          className={styles.marker}
          style={{
            left: getLeftStyle(value),
          }}
          key={value}
        >
          <div className={styles.markerLine}></div>
          <span className={styles.markerText}>{label(value)}</span>
        </div>
      ))}
    </div>
  );
}
