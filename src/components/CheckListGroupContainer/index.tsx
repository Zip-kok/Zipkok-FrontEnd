import React, { useCallback } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './CheckListGroupContainer.module.css';

import CheckListGroup from '../CheckListGroup';
import CheckList from '../CheckList';

import CheckListGroupType from '../../types/CheckListGroup';

interface CheckListGroupContainerProps {
  checkListGroups: CheckListGroupType[];
  setCheckListGroups: React.Dispatch<
    React.SetStateAction<CheckListGroupType[]>
  >;
}

export default function CheckListGroupContainer({
  checkListGroups,
  setCheckListGroups,
}: CheckListGroupContainerProps) {
  const moveGroup = useCallback((dragIndex: number, hoverIndex: number) => {
    setCheckListGroups((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex] as CheckListGroupType],
        ],
      }),
    );
  }, []);

  const renderGroup = useCallback(
    (group: CheckListGroupType, index: number) => {
      return (
        <CheckListGroup
          index={index}
          name={group.name}
          enabled={group.enabled}
          onClick={() => {}}
          key={group.name}
          moveGroup={moveGroup}
        >
          {group.items.map((item, itemIndex) => (
            <CheckList
              name={item.name}
              enabled={item.enabled}
              key={item.name}
              onClick={() => {}}
            />
          ))}
        </CheckListGroup>
      );
    },
    [],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        {checkListGroups.map((group, groupIndex) =>
          renderGroup(group, groupIndex),
        )}
      </div>
    </DndProvider>
  );
}
