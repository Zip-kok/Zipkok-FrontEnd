import React from 'react';
import styles from './IconText.module.css';

interface IconTextProps {
  img: string;
  text?: string | number;
  sizeText?: string | number;
}

const IconText: React.FC<IconTextProps> = ({ img, text, sizeText }) => {
  return (
    <div className={styles.root}>
      <img src={img} />
      <p>{text}</p>
      <p>{sizeText}</p>
    </div>
  );
};

export default IconText;
