import React from 'react';
import { useNavigate } from 'react-router-dom';

import heart_fill from 'assets/img/fill/heart_selected.svg';
import heart from 'assets/img/line(2)/heart.svg';
import backIcon from 'assets/img/line(2)/left_arrow.svg';
import share from 'assets/img/line(2)/share.svg';

import styles from './Header.module.css';

import type { Button } from 'contexts/uiStore';

interface HeaderProps {
  title: string;
  titleIcon?: string;
  backBtnEnabled?: boolean;
  Buttons?: Button[];
}

const Header = ({
  title,
  titleIcon,
  backBtnEnabled = false,
  Buttons = [],
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span className={styles.btnContainer}>
        {backBtnEnabled && (
          <button className="imgBtn" onClick={() => navigate(-1)}>
            <img src={backIcon}></img>
          </button>
        )}
      </span>

      <span className={styles.titleContainer}>
        {titleIcon && <img src={titleIcon}></img>}
        <span>{title}</span>
      </span>

      <span className={styles.btnContainer}>
        {Buttons.map((btn) => (
          <button key={btn.id} className="imgBtn" onClick={btn.onPress}>
            <img src={btn.img}></img>
          </button>
        ))}
      </span>
    </div>
  );
};

export default Header;
