import React from 'react'
import styles from './KokItem.module.css'
import data from '../../../../models/kokItemReview.json'

const ReView = () => {

  const {impressions, facilityStarCount,infraStarCount,structureStarCount
  ,vibeStarCount,reviewText} = data.result;

  return (
    <div className={styles.body}>
      <div className={styles.TagCtn}>
        {impressions.map((tag, index) => (
          <p className={styles.tag} key={index}>
            {tag}
          </p>
        ))}
      </div>
      <div className={styles.starCtn}>
        <h3>매물은 어떠셨나요?</h3>
      </div>
      
      <div>

      </div>
      
      <div className={styles.reviewTextCtn}>
        <textarea defaultValue={reviewText} />
      </div>

      <div className={styles.blank}/>
      <div className={styles.blank}/>
    </div>
  )
}

export default ReView;
