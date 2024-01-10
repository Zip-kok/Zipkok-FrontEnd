import React from 'react';
import IconTextBtn from '../../../components/IconTextBtn';

import styles from './Mypage.module.css';

import my from '../../../assets/img/my.svg';
import edit from '../../../assets/img/edit.svg';
import heart from '../../../assets/img/heart.svg';
import pen from '../../../assets/img/pen.svg';
import pin from '../../../assets/img/pin.svg';
import location_Pin from '../../../assets/img/location_pin.svg';
import notice from '../../../assets/img/notice.svg';
import inquiry from '../../../assets/img/inquiry.svg';
import logout from '../../../assets/img/logout.svg';
import quit from '../../../assets/img/quit.svg';
import { useNavigate } from 'react-router-dom';

export const Mypage = () => {
  const navigate = useNavigate();

  const handleKeepClick = () => {};
  const handleListEditClick = () => {};
  const handlePinClick = () => {};
  const handleRecentClick = () => {};
  const handleNoticeClick = () => {};
  const handleInquiryClick = () => {};
  const handleLogoutClick = () => {};
  const handleQuitClick = () => {};

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <img src={my} />
        <p>마이페이지</p>
      </div>

      <div className={styles.body}>
        <div className={styles.profile}>
          <img src="https://cdn.royalcanin-weshare-online.io/3DKT5m8BN5A8uWWASDMR/v4/ptpc1s3-welsh-pembroke-corgi-puppy-running-outside-in-a-garden" />
          <div className={styles.text}>
            <div className={styles.name}>보리는 강아지 내가 주인</div>
            <div className={styles.location}>#성북구 정릉동</div>
            <div className={styles.tag}>
              <p>월세</p>
              <p>원룸</p>
              <p>1000/60이하</p>
            </div>
          </div>
        </div>

        <button className={styles.profileEdit}>
          <img src={edit} />
          프로필 수정하기
        </button>

        <div className={styles.bodyBtns}>
          <IconTextBtn
            image={heart}
            text="찜한 매물"
            onClick={handleKeepClick}
          />
          <IconTextBtn
            image={pen}
            text="리스트 항목 수정"
            onClick={handleListEditClick}
          />
          <IconTextBtn image={pin} text="나의 핀" onClick={handlePinClick} />
        </div>
        <div className={styles.btnList}>
          <IconTextBtn
            image={location_Pin}
            text="최근 본 매물"
            onClick={handleRecentClick}
          />
          <IconTextBtn
            image={notice}
            text="공지사항"
            onClick={handleNoticeClick}
          />
          <IconTextBtn
            image={inquiry}
            text="문의하기"
            onClick={handleInquiryClick}
          />
          <IconTextBtn
            image={logout}
            text="로그아웃"
            onClick={handleLogoutClick}
          />
          <IconTextBtn image={quit} text="회원탈퇴" onClick={handleQuitClick} />
        </div>
      </div>
    </div>
  );
};
