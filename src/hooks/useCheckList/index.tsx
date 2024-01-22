import React, { useState } from 'react';

import CheckListGroupContainer from 'components/CheckListGroupContainer';
import type { CheckListGroup } from 'components/CheckListGroupContainer';

export default function useCheckList(checkListGroups: CheckListGroup[]) {
  const [checkList, setCheckList] = useState<CheckListGroup[]>(checkListGroups);

  const container = (
    <CheckListGroupContainer
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
