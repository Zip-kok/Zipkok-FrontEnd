import React from 'react'

interface IconTextBtnProps {
  image:string;
  text:string;
  onClick: () => void;
}

const IconTextBtn: React.FC<IconTextBtnProps> = ({image, text, onClick}) => {
  return (
    <button onClick={onClick}>
      <img src={image} />
      {text}
    </button>
  )}
  

  export default IconTextBtn;