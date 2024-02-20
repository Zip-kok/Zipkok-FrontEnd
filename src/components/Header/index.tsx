import React from 'react';
import { useNavigate } from 'react-router-dom';

import backIcon from 'assets/img/line(2)/left_arrow.svg';

import styles from './Header.module.css';

import type { Button } from 'contexts/uiStore';

interface HeaderProps {
  title: string;
  titleIcon?: string;
  backCallback?: () => void;
  backBtnEnabled?: boolean;
  buttons?: Button[];
}

const Header = ({
  title,
  titleIcon,
  backCallback,
  backBtnEnabled = false,
  buttons = [],
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span className={styles.btnContainer}>
        {backBtnEnabled && (
          <button
            className="imgBtn"
            onClick={() => {
              if (backCallback) {
                backCallback();
              } else {
                navigate(-1);
              }
            }}
          >
            <img src={backIcon}></img>
          </button>
        )}
      </span>

      <span className={styles.titleContainer}>
        {titleIcon && <img src={titleIcon}></img>}
        <span>{title}</span>
      </span>

      <span className={styles.btnContainer}>
        {buttons.map((btn) => (
          <button key={btn.id} className="imgBtn" onClick={btn.onPress}>
            <img src={btn.img}></img>
          </button>
        ))}
      </span>
    </div>
  );
};

export default Header;
