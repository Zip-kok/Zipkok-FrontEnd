import React from 'react';

import { StarRating } from 'components';

import styles from './Review.module.css';

interface ReviewProps {
  impressions: string[];
  facilityStarCount: number;
  infraStarCount: number;
  structureStarCount: number;
  vibeStarCount: number;
  reviewText: string;
}

export default function Review({
  impressions,
  facilityStarCount,
  infraStarCount,
  structureStarCount,
  vibeStarCount,
  reviewText,
}: ReviewProps) {
  return (
    <>
      {/* 인상 */}
      <div className={styles.TagCtn}>
        {impressions.map((tag, index) => (
          <div className={styles.tag} key={index}>
            {tag}
          </div>
        ))}
      </div>

      {/* 별점 */}
      <div className={styles.header}>
        <span className={styles.title}>매물은 어떠셨나요?</span>
      </div>
      <div className={styles.starCtn}>
        <StarRating
          label="시설"
          onRating={(facilityStarCount) => facilityStarCount}
          readOnly={true}
          starCount={facilityStarCount}
        />
        <StarRating
          label="인프라"
          onRating={(rating) => console.log(rating)}
          readOnly={true}
          starCount={infraStarCount}
        />
        <StarRating
          label="구조"
          onRating={(rating) => console.log(rating)}
          readOnly={true}
          starCount={structureStarCount}
        />
        <StarRating
          label="분위기"
          onRating={(rating) => console.log(rating)}
          readOnly={true}
          starCount={vibeStarCount}
        />
      </div>

      <div className={styles.reviewTextCtn}>
        <textarea defaultValue={reviewText} readOnly={true} />
      </div>
    </>
  );
}
