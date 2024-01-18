import React from 'react';

import styles from './IconBtn.module.css';

type IconBtnLayout = 'vertical' | 'horizontal';

interface IconBtnProps {
  image: string;
  text: string;
  onClick: () => void;
  layout?: IconBtnLayout;
  padding?: string;
  gap?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?: string;
}

const IconBtn: React.FC<IconBtnProps> = ({
  image,
  text,
  onClick,
  layout = 'horizontal',
  padding = '0',
  gap = '8px',
  color = '#000000',
  fontFamily = 'Pretendard',
  fontSize = '14px',
  fontStyle = 'normal',
  fontWeight = 'normal',
}) => {
  const style = {
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    padding,
    gap,
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
  } as React.CSSProperties;

  return (
    <button className={styles.btn} onClick={onClick} style={style}>
      <img src={image} />
      {text}
    </button>
  );
};

export default IconBtn;
