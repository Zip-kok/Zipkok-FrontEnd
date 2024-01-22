import React, { useState } from 'react';

import { CheckListCategoryContainer } from 'components';
import type { CheckListGroup } from 'types/CheckList';

export default function useCheckList(checkListGroups: CheckListGroup[]) {
  const [checkList, setCheckList] = useState<CheckListGroup[]>(checkListGroups);

  const container = (
    <CheckListCategoryContainer
      checkListGroups={checkList}
      setCheckListGroups={setCheckList}
    />
  );

  return [container, checkList, setCheckList] as [
    typeof container,
    CheckListGroup[],
    React.Dispatch<React.SetStateAction<CheckListGroup[]>>,
  ];
}
