import React from 'react';

interface IconBtnProps {
  image: string;
  text: string;
  onClick: () => void;
}

const IconBtn: React.FC<IconBtnProps> = ({ image, text, onClick }) => {
  return (
    <button onClick={onClick}>
      <img src={image} />
      {text}
    </button>
  );
};

export default IconBtn;
