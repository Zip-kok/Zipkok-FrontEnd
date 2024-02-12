import React, { useState } from 'react';

import { Highlight } from 'components';
import optionsToCheckListGroups from 'utils/optionsToCheckListGroups';

import CheckListCategoryContainer from './CheckListCategoryContainer';
import styles from '../KokEdit.module.css';

import type { Option } from 'apis/getUserKokOption';
import type { CheckListGroup } from 'types/CheckList';

interface NearHomeProps {
  highlights: string[];
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const NearHome = ({ highlights, options, setOptions }: NearHomeProps) => {
  const [checkListGroups, setCheckListGroups] = useState<CheckListGroup[]>(
    optionsToCheckListGroups(options),
  );

  return (
    <div className={styles.root}>
      <div className={styles.highlightContainer}>
        <h1>매물 하이라이트</h1>
        <div>
          {highlights.map((highlight) => (
            <Highlight key={highlight} text={highlight} highlightEnabled />
          ))}
        </div>
      </div>

      <div className={styles.checkListGroupContainer}>
        <CheckListCategoryContainer
          checkListGroups={checkListGroups}
          setCheckListGroups={setCheckListGroups}
        />
      </div>
    </div>
  );
};

export default NearHome;
