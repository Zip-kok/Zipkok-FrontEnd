import React from 'react';

import styles from './KokEdit.module.css';

import Highlight from '../../../../components/Highlight';

const NearHome = () => {
  return (
    <div className={styles.root}>
      <div className={styles.highlightContainer}>
        <h1>매물 하이라이트</h1>
        <div>
          <Highlight text="CCTV" highlightEnabled />
          <Highlight text="주변공원" highlightEnabled />
          <Highlight text="현관보안" highlightEnabled />
          <Highlight text="편세권" highlightEnabled />
          <Highlight text="주차장" highlightEnabled />
          <Highlight text="역세권" highlightEnabled />
          <Highlight text="더블역세권" highlightEnabled />
          <Highlight text="트리플역세권" highlightEnabled />
          <Highlight text="마트" />
        </div>
      </div>
    </div>
  );
};

export default NearHome;
