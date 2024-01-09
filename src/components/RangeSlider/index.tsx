import React, { useState, useRef } from 'react';

import getScaledValue from './getScaledValue';
import getVisualValue from './getVisualValue';

import styles from './RangeSlider.module.css';

export type ScaleMethod = 'linear' | 'square' | 'logarithmic' | 'exponential';

interface RangeSliderProps {
  min: number;
  max: number;
  defaultRangeStart: number;
  defaultRangeEnd: number;
  markers?: number[];
  scaleMethod?: ScaleMethod;
  priceToString?: (number: number) => string;
  onChange: (rangeStart: number, rangeEnd: number) => void;
}

export default function RangeSlider({
  min,
  max,
  defaultRangeStart,
  defaultRangeEnd,
  markers = [],
  scaleMethod = 'linear',
  priceToString: label = (number) => number.toLocaleString(),
  onChange,
}: RangeSliderProps) {
  const slider1 = useRef<HTMLInputElement>(null);
  const slider2 = useRef<HTMLInputElement>(null);

  // 반환 값
  const [start, setStart] = useState<number>(defaultRangeStart);
  const [end, setEnd] = useState<number>(defaultRangeEnd);

  // 원본 값
  const [visualStart, setVisualStart] = useState<number>(
    getVisualValue(defaultRangeStart, min, max, scaleMethod),
  );
  const [visualEnd, setVisualEnd] = useState<number>(
    getVisualValue(defaultRangeEnd, min, max, scaleMethod),
  );

  function getLeftStyle(value: number) {
    return `calc((${value} / 100 * (100% - 24px) + 12px)`;
  }

  function handleSliderChange(index: number) {
    console.assert(index === 1 || index === 2, 'index must be 1 or 2');

    const value = (index === 1 ? slider1 : slider2).current!.valueAsNumber;
    const oppositeValue = (index === 1 ? slider2 : slider1).current!
      .valueAsNumber;

    if (value > oppositeValue) {
      setVisualStart(oppositeValue);
      setVisualEnd(value);

      setStart(getScaledValue(oppositeValue, min, max, scaleMethod));
      setEnd(getScaledValue(value, min, max, scaleMethod));
    } else {
      setVisualStart(value);
      setVisualEnd(oppositeValue);

      setStart(getScaledValue(value, min, max, scaleMethod));
      setEnd(getScaledValue(oppositeValue, min, max, scaleMethod));
    }

    onChange(start, end);
  }

  return (
    <div className={styles.container}>
      {/* range input thumb 위에 있는 input의 현재 값 표시 */}
      <div
        className={styles.label}
        style={{
          left: getLeftStyle(visualStart),
        }}
      >
        {label(start)}
      </div>
      <div
        className={styles.label}
        style={{
          left: getLeftStyle(visualEnd),
        }}
      >
        {label(end)}
      </div>

      <input
        className={styles.slider}
        type="range"
        min={0}
        max={100}
        step={0.1}
        defaultValue={getVisualValue(defaultRangeStart, min, max, scaleMethod)}
        onChange={() => {
          handleSliderChange(1);
        }}
        ref={slider1}
      />
      <input
        className={styles.slider}
        type="range"
        min={0}
        max={100}
        step={0.1}
        defaultValue={getVisualValue(defaultRangeEnd, min, max, scaleMethod)}
        onChange={() => {
          handleSliderChange(2);
        }}
        ref={slider2}
      />

      <div className={styles.sliderBackground}></div>
      <div
        className={styles.sliderForeground}
        style={{
          left: `${visualStart}%`,
          width: `${visualEnd - visualStart}%`,
        }}
      ></div>

      {markers.map((value) => (
        <div
          className={styles.marker}
          style={{
            left: getLeftStyle(getVisualValue(value, min, max, scaleMethod)),
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
