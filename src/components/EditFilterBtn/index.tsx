import React from 'react';
import styles from './EditFilterBtn.module.css';

interface EditFilterBtnProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const EditGenderBtn: React.FC<EditFilterBtnProps> = ({
  text,
  isSelected,
  onClick,
}) => {
  const buttonStyle = isSelected ? styles.selected : styles.notSelected;

  return (
    <button
      className={`${styles.EditFilterBtn} ${buttonStyle}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default EditGenderBtn;
