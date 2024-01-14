export default function getPriceLabelString(value: number) {
  // 0
  if (value === 0) {
    return '0';
  }
  // 1천만 미만
  else if (value < 10_000_000) {
    return `${Math.ceil(value / 10_000)}만`;
  }
  // 1억 미만
  else if (value < 100_000_000) {
    return `${Math.ceil(value / 1_000_000) / 10}천만`;
  }
  // 1억 이상
  else return `${Math.ceil(value / 10_000_000) / 10}억`;
}
