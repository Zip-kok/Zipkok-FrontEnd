import React, { useState } from 'react';

import optionsToCheckListGroups from 'utils/optionsToCheckListGroups';

import CheckListCategoryContainer from './CheckListCategoryContainer';
import styles from '../KokEdit.module.css';

import type { Option } from 'apis/getUserKokOption';
import type { CheckListGroup } from 'types/CheckList';

interface ContractProps {
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const Contract = ({ options, setOptions }: ContractProps) => {
  const [checkListGroups, setCheckListGroups] = useState<CheckListGroup[]>(
    optionsToCheckListGroups(options),
  );

  return (
    <div className={styles.root}>
      <div className={styles.checkListGroupContainer}>
        <CheckListCategoryContainer
          checkListGroups={checkListGroups}
          setCheckListGroups={setCheckListGroups}
        />
      </div>
    </div>
  );
};

export default Contract;
