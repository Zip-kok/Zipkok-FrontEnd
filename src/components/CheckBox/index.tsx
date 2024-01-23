import React, { useState } from 'react';

import defaultIcon from '../../assets/img/checkbox_default.svg';
import checkIcon from '../../assets/img/checkbox_selected.svg';

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  function handleClick() {
    onChange?.(!isChecked);
    setIsChecked(!isChecked);
  }

  return (
    <button className="imgBtn" onClick={handleClick}>
      <img src={isChecked ? checkIcon : defaultIcon} />
    </button>
  );
}
