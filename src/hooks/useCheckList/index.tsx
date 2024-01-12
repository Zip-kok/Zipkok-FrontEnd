import React, { useState, useEffect, useCallback } from 'react';
import Sortable from 'sortablejs';

import CheckList from '../../components/CheckList';
import CheckListGroup, { handleClass } from '../../components/CheckListGroup';
import CheckListGroupContainer from '../../components/CheckListGroupContainer';

export interface CheckListItem {
  name: string;
  enabled: boolean;
}

export interface CheckListGroup {
  name: string;
  enabled: boolean;
  items: CheckListItem[];
}

export default function useCheckList(checkListGroups: CheckListGroup[]) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [checkList, setCheckList] = useState<CheckListGroup[]>(checkListGroups);

  const handleContainerClick = (index: number) => {
    setCheckList((prev) => {
      const newCheckList = [...prev];
      newCheckList[index].enabled = !newCheckList[index].enabled;
      newCheckList[index].items.forEach((item) => {
        item.enabled = newCheckList[index].enabled;
      });
      return newCheckList;
    });
  };

  const handleItemClick = (groupIndex: number, itemIndex: number) => {
    setCheckList((prev) => {
      const newCheckListGroups = [...prev];
      newCheckListGroups[groupIndex].items[itemIndex].enabled =
        !newCheckListGroups[groupIndex].items[itemIndex].enabled;
      newCheckListGroups[groupIndex].enabled = newCheckListGroups[
        groupIndex
      ].items.some((item) => item.enabled);
      return newCheckListGroups;
    });
  };

  // 드래그 앤 드롭
  useEffect(() => {
    Sortable.create(containerRef.current as HTMLElement, {
      direction: 'vertical',
      delay: 150,
      delayOnTouchOnly: true,
      touchStartThreshold: 4,
      animation: 150,
      handle: `.${handleClass}`,

      onUpdate: (event) => {
        const { oldIndex, newIndex } = event;

        if (oldIndex !== undefined && newIndex !== undefined) {
          setCheckList((prev) => {
            const newCheckListGroups = [...prev];
            const [removed] = newCheckListGroups.splice(oldIndex, 1);
            newCheckListGroups.splice(newIndex, 0, removed);
            return newCheckListGroups;
          });
        }
      },
    });
  }, []);

  const containerCallback = useCallback(
    () => (
      <CheckListGroupContainer ref={containerRef}>
        {checkList.map((group, groupIndex) => (
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
      </CheckListGroupContainer>
    ),
    [checkList],
  );

  return [containerCallback, checkList, setCheckList] as [
    () => JSX.Element,
    CheckListGroup[],
    React.Dispatch<React.SetStateAction<CheckListGroup[]>>,
  ];
}
