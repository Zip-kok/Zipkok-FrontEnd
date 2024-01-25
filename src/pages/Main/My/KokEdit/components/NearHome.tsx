import React, { useState } from 'react';

import { Highlight } from 'components';

import CheckListCategoryContainer from './CheckListCategoryContainer';
import styles from '../KokEdit.module.css';

const NearHome = () => {
  const [checklists, setChecklists] = useState([
    {
      id: 0,
      name: '편의성',
      enabled: true,
      items: [
        {
          name: '학교 / 직장과 가깝나요?',
          enabled: true,
        },
        {
          name: '편의점이 근처에 있나요?',
          enabled: true,
        },
        {
          name: '대형마트가 근처에 있나요?',
          enabled: true,
        },
      ],
    },
    {
      id: 1,
      name: '접근성',
      enabled: true,
      items: [
        {
          name: '언덕과 오르막길이 있나요?',
          enabled: true,
        },
        {
          name: '골목길이 많나요?',
          enabled: true,
        },
        {
          name: '버스정류장이 근처에 있나요?',
          enabled: false,
        },
      ],
    },
    {
      id: 2,
      name: '예시',
      enabled: false,
      items: [],
    },
  ]);

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

      <div className={styles.checkListGroupContainer}>
        <CheckListCategoryContainer
          checkListGroups={checklists}
          setCheckListGroups={setChecklists}
        />
      </div>
    </div>
  );
};

export default NearHome;
