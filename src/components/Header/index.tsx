import React from 'react';

import backIcon from '../../assets/img/left_arrow.svg';

import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  titleIcon?: string;
  backBtnEnabled?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
}

const Header = ({
  title,
  titleIcon,
  backBtnEnabled = false,
  onBack,
  children,
}: HeaderProps) => {
  console.assert(
    !backBtnEnabled || onBack,
    'onBack must be provided if backBtnEnabled is true',
  );

  return (
    <div className={styles.container}>
      <span>
        {backBtnEnabled && (
          <button className="imgBtn" onClick={onBack}>
            <img src={backIcon}></img>
          </button>
        )}
      </span>

      <span className={styles.titleContainer}>
        {titleIcon && <img src={titleIcon}></img>}
        <span>{title}</span>
      </span>

      <span className={styles.btnContainer}>{children}</span>
    </div>
  );
};

export default Header;
