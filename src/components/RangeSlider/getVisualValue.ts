import { ScaleMethod } from './';

// 실제 값에서 visual 값으로 변환
export default function getVisualValue(
  value: number,
  min: number,
  max: number,
  scaleMethod: ScaleMethod,
) {
  if (scaleMethod === 'linear') {
    return ((value - min) / (max - min)) * 100;
  } else if (scaleMethod === 'square') {
    return Math.sqrt((value - min) / (max - min)) * 100;
  }
  return 0;
}
