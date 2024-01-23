// StarRatingWithLabel.tsx
import React, { useState } from 'react';
import starWhite from 'assets/img/line(1)/star_white.svg';
import starRed from 'assets/img/fill/star_red.svg';
import styles from './StarRating.module.css';

interface StarRatingProps {
  label: string;
  onRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ label, onRating }) => {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (index: number): void => {
    const newRating = index;
    setRating(newRating);
    onRating(newRating);
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
          />
        ))}
      </div>
    </div>
  );
};

export default StarRating;
