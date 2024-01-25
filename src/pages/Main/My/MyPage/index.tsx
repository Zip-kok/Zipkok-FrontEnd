import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import edit from 'assets/img/line(2)/edit.svg';
import heart from 'assets/img/line(2)/heart.svg';
import inquiry from 'assets/img/line(2)/inquiry.svg';
import location_Pin from 'assets/img/line(2)/location_pin.svg';
import logout from 'assets/img/line(2)/logout.svg';
import my from 'assets/img/line(2)/my.svg';
import notice from 'assets/img/line(2)/notice.svg';
import pen from 'assets/img/line(2)/pen.svg';
import pin from 'assets/img/line(2)/pin.svg';
import quit from 'assets/img/line(2)/quit.svg';
import { IconBtn } from 'components';
import useUIStore from 'contexts/uiStore';

import styles from './Mypage.module.css';

const Mypage = () => {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '마이페이지',
      headerIcon: my,
      headerBackButtonEnabled: true,
      naviEnabled: true,
    }));
  }, []);

  const navigate = useNavigate();

  const handleProfileEditClick = () => {
    navigate('./profileEdit');
  };

  const handleKeepClick = () => {
    navigate('./likedProperties');
  };

  const handleListEditClick = () => {
    navigate('./kokEdit');
  };
  const handlePinClick = () => {};
  const handleRecentClick = () => {};
  const handleNoticeClick = () => {};
  const handleInquiryClick = () => {};
  const handleLogoutClick = () => {};
  const handleQuitClick = () => {};

  return (
    <div className={styles.root}>
      <div className={styles.profile}>
        <img src="https://cdn.royalcanin-weshare-online.io/3DKT5m8BN5A8uWWASDMR/v4/ptpc1s3-welsh-pembroke-corgi-puppy-running-outside-in-a-garden" />
        <div className={styles.text}>
          <div className={styles.name}>보리는 강아지 내가 주인</div>
          <div className={styles.location}>#성북구 정릉동</div>
          <div className={styles.tag}>
            <p>월세</p>
            <p>원룸</p>
            <p>~6천/~40만</p>
          </div>
        </div>
      </div>

      <button className={styles.profileEdit} onClick={handleProfileEditClick}>
        <img src={edit} />
        프로필 수정하기
      </button>

      <div className={styles.bodyBtns}>
        <IconBtn
          image={heart}
          text="찜한 매물"
          onClick={handleKeepClick}
          padding="6px 0"
          layout="vertical"
          gap="8px"
          fontSize="14px"
          fontWeight="400"
        />
        <IconBtn
          image={pen}
          text="리스트 항목 수정"
          onClick={handleListEditClick}
          padding="6px 0"
          layout="vertical"
          gap="8px"
          fontSize="14px"
          fontWeight="400"
        />
        <IconBtn
          image={pin}
          text="나의 핀"
          onClick={handlePinClick}
          padding="6px 0"
          layout="vertical"
          gap="8px"
          fontSize="14px"
          fontWeight="400"
        />
      </div>
      <div className={styles.btnList}>
        <IconBtn
          image={location_Pin}
          text="최근 본 매물"
          onClick={handleRecentClick}
          gap="12px"
          fontSize="14px"
          fontWeight="400"
        />
        <IconBtn
          image={notice}
          text="공지사항"
          onClick={handleNoticeClick}
          gap="12px"
          fontSize="14px"
          fontWeight="400"
        />
        <IconBtn
          image={inquiry}
          text="문의하기"
          onClick={handleInquiryClick}
          gap="12px"
          fontSize="14px"
          fontWeight="400"
        />
        <IconBtn
          image={logout}
          text="로그아웃"
          onClick={handleLogoutClick}
          gap="12px"
          fontSize="14px"
          fontWeight="400"
        />
        <IconBtn
          image={quit}
          text="회원탈퇴"
          onClick={handleQuitClick}
          gap="12px"
          fontSize="14px"
          fontWeight="400"
        />
      </div>
    </div>
  );
};

export default Mypage;