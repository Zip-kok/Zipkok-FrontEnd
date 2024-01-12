import React from 'react';

import styles from './LikedProperties.module.css';
import Header from '../../../../components/Header';
import { useNavigate } from 'react-router-dom';

const LikedProperties = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <Header
        title="찜한 매물"
        onBack={() => {
          navigate(-1);
        }}
        backBtnEnabled
      ></Header>
    </div>
  );
};

export default LikedProperties;
