import React from 'react';

import { OptionsComponent } from 'components';

import styles from './Outer.module.css';

import type { UserKokOption } from 'apis/getUserKokOption';

interface OuterProps {
  highlights: string[];
  options: UserKokOption[];
  setOptions?: React.Dispatch<React.SetStateAction<UserKokOption[]>>;
}

export default function Outer({ highlights, options, setOptions }: OuterProps) {
  return (
    <>
      <div className={styles.TagCtn}>
        {highlights.map((tag, index) => (
          <div className={styles.tag} key={index}>
            {tag}
          </div>
        ))}
      </div>

      <div className={styles.optionsCtn}>
        <OptionsComponent
          kokOptions={options}
          setKokOptions={setOptions}
          readOnly={true}
          initialValue={true}
        />
      </div>
    </>
  );
}
