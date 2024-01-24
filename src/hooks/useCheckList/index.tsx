import React, { useState, useCallback } from 'react';

import { CheckListCategoryContainer } from 'components';

import type { CheckListGroup } from 'types/CheckList';

export default function useCheckList(checkListGroups: CheckListGroup[]) {
  const [checkList, setCheckList] = useState<CheckListGroup[]>(checkListGroups);

  const Container = useCallback(
    () => (
      <CheckListCategoryContainer
        checkListGroups={checkList}
        setCheckListGroups={setCheckList}
      />
    ),
    [],
  );

  return [Container, checkList, setCheckList] as [
    typeof Container,
    CheckListGroup[],
    React.Dispatch<React.SetStateAction<CheckListGroup[]>>,
  ];
}
