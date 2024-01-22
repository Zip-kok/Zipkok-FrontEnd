import React from 'react';

import backIcon from '../../assets/img/left_arrow.svg';
import share from '../../assets/img/share.svg';
import heart from '../../assets/img/mypage/heart.svg';
import heart_fill from '../../assets/img/kokItem/kokItem_FillHeart.svg';

import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  titleIcon?: string;
  backBtnEnabled?: boolean;
  onBack?: () => void;
  heartBtnEnabled?: boolean;
  heartBtnClick?: () => void;
  shareBtnEnabled?: boolean;
  shareBtnClick?: () => void;
}

const Header = ({
  title,
  titleIcon,
  backBtnEnabled = false,
  onBack,
  heartBtnEnabled,
  heartBtnClick,
  shareBtnEnabled = false,
  shareBtnClick,
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

      <span className={styles.btnContainer}>
        <span>
          <button className="imgBtn" onClick={heartBtnClick}>
            {heartBtnEnabled ? <img src={heart_fill} /> : <img src={heart} />}
          </button>
        </span>
        <span>
          {shareBtnEnabled && (
            <button className="imgBtn" onClick={shareBtnClick}>
              <img src={share} className={styles.shareBtn}></img>
            </button>
          )}
        </span>
      </span>
    </div>
  );
};

export default Header;
