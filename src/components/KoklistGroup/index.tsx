import React, { useState } from 'react';

import styles from './KoklistGroup.module.css';

import defaultIcon from '../../assets/img/check_default.svg';
import selectIcon from '../../assets/img/check_selected.svg';
import cameraIcon from '../../assets/img/camera.svg';
import Checkbox from '../CheckBox';

interface Koklist {
  name: string;
  checked: boolean;
}

interface KoklistGroupProps {
  title: string;
  koklists: Koklist[];
  selected: boolean;
}

export default function KoklistGroup({
  title,
  koklists,
  selected,
}: KoklistGroupProps) {
  const [isSelected, setIsSelected] = useState(selected);

  function handleSelect() {
    setIsSelected(!isSelected);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <button className="imgBtn" onClick={handleSelect}>
            <img src={isSelected ? selectIcon : defaultIcon} />
          </button>
          <span>{title}</span>
        </div>
        <button className="imgBtn">
          <img src={cameraIcon} />
        </button>
      </div>

      {isSelected && (
        <div className={styles.koklists}>
          {koklists.map((koklist) => (
            <div className={styles.koklist} key={koklist.name}>
              <Checkbox checked={koklist.checked} />
              <span>{koklist.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
