import React from 'react';
import { ReactSortable } from 'react-sortablejs';

import styles from './OptionContainer.module.css';
import DetailOption from '../DetailOption';
import Option from '../Option';

import type { KokOption } from 'types/KokOption';

interface OptionContainerProps {
  options: KokOption[];
  setOptions: React.Dispatch<React.SetStateAction<KokOption[]>>;
}

export default function OptionContainer({
  options,
  setOptions,
}: OptionContainerProps) {
  const handleContainerClick = (index: number) => {
    setOptions((prev) => {
      const newCheckList = [...prev];
      newCheckList[index].isVisible = !newCheckList[index].isVisible;
      newCheckList[index].detailOptions.forEach((item) => {
        item.detailOptionIsVisible = newCheckList[index].isVisible;
      });
      return newCheckList;
    });
  };

  const handleItemClick = (groupIndex: number, itemIndex: number) => {
    setOptions((prev) => {
      const newCheckListGroups = [...prev];
      newCheckListGroups[groupIndex].detailOptions[
        itemIndex
      ].detailOptionIsVisible =
        !newCheckListGroups[groupIndex].detailOptions[itemIndex]
          .detailOptionIsVisible;
      newCheckListGroups[groupIndex].isVisible = newCheckListGroups[
        groupIndex
      ].detailOptions.some((item) => item.detailOptionIsVisible);
      return newCheckListGroups;
    });
  };

  return (
    <ReactSortable
      className={styles.container}
      list={options}
      setList={setOptions}
      delay={150}
      delayOnTouchOnly
      touchStartThreshold={4}
      animation={150}
      handle={'.drag'}
    >
      {options.map((option, index) => (
        <Option
          name={option.optionTitle}
          enabled={option.isVisible}
          onClick={() => handleContainerClick(index)}
          key={`${option.id}`}
        >
          {option.detailOptions.map((item, itemIndex) => (
            <DetailOption
              name={item.detailOptionTitle}
              enabled={item.detailOptionIsVisible}
              key={item.detailOptionId}
              onClick={() => handleItemClick(index, itemIndex)}
            />
          ))}
        </Option>
      ))}
    </ReactSortable>
  );
}
