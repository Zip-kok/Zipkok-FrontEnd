import React from 'react'
import styles from './EditGenderBtn.module.css'

interface EditGenderBtnProps {
  text:string;
  isSelected:boolean;
  onClick: () => void;
}

const EditGenderBtn: React.FC<EditGenderBtnProps> = ({text, isSelected,onClick}) => {
  
  const buttonStyle = isSelected ? styles.selected : styles.notSelected;

  return (
    
    <button className={`${styles.EditGenderBtn} ${buttonStyle}`}
    onClick={onClick}>
      {text}
    </button>
    
  )}
  

  export default EditGenderBtn;