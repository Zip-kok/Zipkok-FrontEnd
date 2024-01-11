import React, { useState } from 'react';

import styles from './KokEdit.module.css';

import Highlight from '../../../../components/Highlight';
import CheckList from '../../../../components/CheckList';
import CheckListGroup from '../../../../components/CheckListGroup';

interface CheckListItem {
  name: string;
  enabled: boolean;
}

interface CheckListGroup {
  name: string;
  enabled: boolean;
  items: CheckListItem[];
}

const NearHome = () => {
  const [checkListGroups, setCheckListGroups] = useState<CheckListGroup[]>([
    {
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
      name: '예시',
      enabled: false,
      items: [],
    },
  ]);

  const handleContainerClick = (index: number) => {};

  const handleItemClick = (groupIndex: number, itemIndex: number) => {};

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

      <div>
        {checkListGroups.map((group, groupIndex) => (
          <CheckListGroup
            name={group.name}
            enabled={group.enabled}
            onClick={() => handleContainerClick(groupIndex)}
            key={group.name}
          >
            {group.items.map((item, itemIndex) => (
              <CheckList
                name={item.name}
                enabled={item.enabled}
                key={item.name}
                onClick={() => handleItemClick(groupIndex, itemIndex)}
              />
            ))}
          </CheckListGroup>
        ))}
      </div>
    </div>
  );
};

export default NearHome;
