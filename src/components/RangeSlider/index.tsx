import React, { useState, useRef, useEffect } from 'react';

import getScaler from './getScaler';
import getUnscaler from './getUnscaler';
import styles from './RangeSlider.module.css';

export type ScaleMethod = 'linear' | 'square' | 'logarithmic' | 'exponential';

// markers: 분기점 배열
// scaleMethod: 속도 조절 (square)
// priceToString: 문자열로 매핑해주는 함수
// onChange
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
  const getScaledValue = getScaler(min, max, scaleMethod);
  const getVisualValue = getUnscaler(min, max, scaleMethod);

  //슬라이더 html 요소를 가리킴
  const slider1 = useRef<HTMLInputElement>(null);
  const slider2 = useRef<HTMLInputElement>(null);

  // 라벨 html 요소를 가리킴
  const [startLabelWidth, setStartLabelWidth] = useState(0);
  const [endLabelWidth, setEndLabelWidth] = useState(0);
  const startLabelRef = useRef<HTMLDivElement>(null);
  const endLabelRef = useRef<HTMLDivElement>(null);

  // 라벨의 너비 추적
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === startLabelRef.current) {
          setStartLabelWidth(entry.contentRect.width);
        } else if (entry.target === endLabelRef.current) {
          setEndLabelWidth(entry.contentRect.width);
        }
      }
    });

    if (startLabelRef.current) observer.observe(startLabelRef.current);
    if (endLabelRef.current) observer.observe(endLabelRef.current);

    return () => observer.disconnect();
  }, [startLabelRef, endLabelRef]);

  // 반환 값
  const [start, setStart] = useState<number>(defaultRangeStart);
  const [end, setEnd] = useState<number>(defaultRangeEnd);

  // 원본 값
  const [visualStart, setVisualStart] = useState<number>(
    getVisualValue(defaultRangeStart),
  );
  const [visualEnd, setVisualEnd] = useState<number>(
    getVisualValue(defaultRangeEnd),
  );

  // left 계산 함수
  function getLeftStyle(value: number, width = 0) {
    return `max(${width / 2}px, calc(${value} / 100 * (100% - 24px) + 12px))`;
  }

  // min max 전환 함수
  function handleSliderChange(index: number) {
    console.assert(index === 1 || index === 2, 'index must be 1 or 2');

    const value = (index === 1 ? slider1 : slider2).current?.valueAsNumber;
    const oppositeValue = (index === 1 ? slider2 : slider1).current
      ?.valueAsNumber;

    if (value === undefined || oppositeValue === undefined) {
      return;
    }

    if (value > oppositeValue) {
      setVisualStart(oppositeValue);
      setVisualEnd(value);

      setStart(getScaledValue(oppositeValue));
      setEnd(getScaledValue(value));
    } else {
      setVisualStart(value);
      setVisualEnd(oppositeValue);

      setStart(getScaledValue(value));
      setEnd(getScaledValue(oppositeValue));
    }

    onChange(start, end);
  }

  function getLabelStyle(
    visualValue: number,
    width: number,
  ): React.CSSProperties {
    if (visualValue < 50) {
      return {
        transform: 'translate(-50%, calc(-100% - 12px - 5px))',
        left: getLeftStyle(visualValue, width),
        textAlign: 'left',
      };
    } else {
      return {
        transform: 'translate(50%, calc(-100% - 12px - 5px))',
        right: getLeftStyle(100 - visualValue, width),
        textAlign: 'right',
      };
    }
  }

  return (
    <div className={styles.container}>
      {/* range input thumb 위에 있는 input의 현재 값 표시 */}
      <div
        className={styles.label}
        style={getLabelStyle(visualStart, startLabelWidth)}
        ref={startLabelRef}
      >
        {label(start)}
      </div>
      <div
        className={styles.label}
        style={getLabelStyle(visualEnd, endLabelWidth)}
        ref={endLabelRef}
      >
        {label(end)}
      </div>

      <input
        className={styles.slider}
        type="range"
        min={0}
        max={100}
        step={0.1}
        defaultValue={getVisualValue(defaultRangeStart)}
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
        defaultValue={getVisualValue(defaultRangeEnd)}
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
            left: getLeftStyle(getVisualValue(value)),
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
