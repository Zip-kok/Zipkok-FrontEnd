import React from 'react';

import { StarRating } from 'components';
import data from 'models/kokItemReview.json';

import styles from '../KokItem.module.css';

const ReView = () => {
  const {
    impressions,
    facilityStarCount,
    infraStarCount,
    structureStarCount,
    vibeStarCount,
    reviewText,
  } = data.result;

  return (
    <div className={styles.content}>
      <div className={styles.TagCtn}>
        {impressions.map((tag, index) => (
          <p className={styles.tag} key={index}>
            {tag}
          </p>
        ))}
      </div>
      <div className={styles.starCtn}>
        <h3>매물은 어떠셨나요?</h3>
        <StarRating label="시설" onRating={(rating) => console.log(rating)} />
        <StarRating label="인프라" onRating={(rating) => console.log(rating)} />
        <StarRating label="구조" onRating={(rating) => console.log(rating)} />
        <StarRating label="분위기" onRating={(rating) => console.log(rating)} />
      </div>

      <div></div>

      <div className={styles.reviewTextCtn}>
        <textarea defaultValue={reviewText} />
      </div>

      <div className={styles.blank} />
      <div className={styles.blank} />
    </div>
  );
};

export default ReView;
