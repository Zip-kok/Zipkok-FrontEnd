import React from 'react';
import styles from './KokItem.module.css';
import data from '../../../../models/kokItemOuter.json';
import OptionsComponent from '../../../../components/Options';

const NearHome = () => {
  const { highlights, options } = data.result;

  return (
    <div className={styles.body}>
      <div className={styles.TagCtn}>
        {highlights.map((tag, index) => (
          <p className={styles.tag} key={index}>
            {tag}
          </p>
        ))}
      </div>

      <div className={styles.optionsCtn}>
        <OptionsComponent optionData={options} />
      </div>

      <div className={styles.blank} />
      <div className={styles.blank} />
    </div>
  );
};

export default NearHome;
