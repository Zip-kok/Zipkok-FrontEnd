export default function getPriceLabelString(value: number) {
  // 1백만 미만
  if (value < 1_000_000) {
    return value.toLocaleString();
  }
  // 1천만 미만
  else if (value < 10_000_000) {
    return `${Math.floor(value / 1_000_000)}백만`;
  }
  // 1억 미만
  else if (value < 100_000_000) {
    return `${Math.floor(value / 10_000_000)}천만`;
  }
  // 1억 이상
  else return `${Math.floor(value / 10_000_000) / 10}억`;
}
