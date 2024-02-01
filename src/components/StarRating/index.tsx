//StarRating
import React, { useState, useEffect } from 'react';

import starRed from 'assets/img/fill/star_red.svg';
import starWhite from 'assets/img/line(1)/star_white.svg';

import styles from './StarRating.module.css';

// readOnly 모드일 때 starCount 설정 가능
interface StarRatingProps {
  label: string;
  onRating: (rating: number) => void;
  readOnly?: boolean;
  starCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  label,
  onRating,
  readOnly = false,
  starCount = 0,
}) => {
  const [rating, setRating] = useState<number>(starCount);

  useEffect(() => {
    if (readOnly) {
      setRating(starCount);
    }
  }, [readOnly, starCount]);

  const handleStarClick = (index: number): void => {
    if (!readOnly) {
      const newRating = index;
      setRating(newRating);
      onRating(newRating);
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
            src={index < rating ? starRed : starWhite}
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
