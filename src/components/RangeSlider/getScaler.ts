import { ScaleMethod } from '.';

// visual 값에서 실제 값으로 변환
export default function getScaler(
  min: number,
  max: number,
  scaleMethod: ScaleMethod,
) {
  // ratio가 0일 때에는 min을 반환
  // ratio가 1일 때에는 max를 반환
  return function (visualValue: number) {
    const ratio = visualValue / 100;

    if (scaleMethod === 'linear') {
      return ratio * (max - min) + min;
    } else if (scaleMethod === 'square') {
      return ratio * ratio * (max - min) + min;
    }
    return 0;
  };
}
