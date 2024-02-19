//starRating
import React, { useState, useEffect } from 'react';

import starRed from 'assets/img/fill/star_red.svg';
import starWhite from 'assets/img/line(1)/star_white.svg';

import styles from './StarRating.module.css';

// readOnly 모드일 때 starCount 설정 가능
interface StarRatingProps {
  label: string;
  starCount: number;
  setStarCount?: React.Dispatch<React.SetStateAction<number>>;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  label,
  starCount,
  setStarCount,
  readOnly = false,
}) => {
  const handleStarClick = (index: number): void => {
    if (!readOnly) {
      const newRating = index;
      setStarCount?.(newRating);
    }
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.label}>{label}</h1>
      <div className={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <img
            key={index}
            className={styles.star}
            src={index < starCount ? starRed : starWhite}
            alt={`${index + 1} stars`}
            onClick={() => handleStarClick(index + 1)}
            style={{ cursor: readOnly ? 'default' : 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
