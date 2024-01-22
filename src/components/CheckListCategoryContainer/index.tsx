import React from 'react';
import { ReactSortable } from 'react-sortablejs';

import styles from './CheckListCategoryContainer.module.css';

import { CheckListItem, CheckListCategory } from 'components';
import type { CheckListGroup } from 'types/CheckList';

interface CheckListCategoryContainerProps {
  checkListGroups: CheckListGroup[];
  setCheckListGroups: React.Dispatch<React.SetStateAction<CheckListGroup[]>>;
}

export default function CheckListCategoryContainer({
  checkListGroups,
  setCheckListGroups,
}: CheckListCategoryContainerProps) {
  const handleContainerClick = (index: number) => {
    setCheckListGroups((prev) => {
      const newCheckList = [...prev];
      newCheckList[index].enabled = !newCheckList[index].enabled;
      newCheckList[index].items.forEach((item) => {
        item.enabled = newCheckList[index].enabled;
      });
      return newCheckList;
    });
  };

  const handleItemClick = (groupIndex: number, itemIndex: number) => {
    setCheckListGroups((prev) => {
      const newCheckListGroups = [...prev];
      newCheckListGroups[groupIndex].items[itemIndex].enabled =
        !newCheckListGroups[groupIndex].items[itemIndex].enabled;
      newCheckListGroups[groupIndex].enabled = newCheckListGroups[
        groupIndex
      ].items.some((item) => item.enabled);
      return newCheckListGroups;
    });
  };

  return (
    <ReactSortable
      className={styles.container}
      list={checkListGroups}
      setList={setCheckListGroups}
      delay={150}
      delayOnTouchOnly
      touchStartThreshold={4}
      animation={150}
      handle={'.drag'}
    >
      {checkListGroups.map((group, groupIndex) => (
        <CheckListCategory
          name={group.name}
          enabled={group.enabled}
          onClick={() => handleContainerClick(groupIndex)}
          key={`${group.id}`}
        >
          {group.items.map((item, itemIndex) => (
            <CheckListItem
              name={item.name}
              enabled={item.enabled}
              key={item.name}
              onClick={() => handleItemClick(groupIndex, itemIndex)}
            />
          ))}
        </CheckListCategory>
      ))}
    </ReactSortable>
  );
}
