import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MyPageInfo, getMyPageInfo } from 'apis/getMyPageInfo';
import edit from 'assets/img/line(2)/edit.svg';
import heart from 'assets/img/line(2)/heart.svg';
import inquiry from 'assets/img/line(2)/inquiry.svg';
import location_Pin from 'assets/img/line(2)/location_pin.svg';
import logoutIcon from 'assets/img/line(2)/logout.svg';
import my from 'assets/img/line(2)/my.svg';
import notice from 'assets/img/line(2)/notice.svg';
import pen from 'assets/img/line(2)/pen.svg';
import pin from 'assets/img/line(2)/pin.svg';
import quit from 'assets/img/line(2)/quit.svg';
import { IconBtn } from 'components';
import useModal from 'contexts/modalStore';
import useUIStore from 'contexts/uiStore';
import getPriceString from 'utils/getPriceString';
import logout from 'utils/logout';

import styles from './Mypage.module.css';
const Mypage = () => {
  const ui = useUIStore();
  const modal = useModal();
  const [myPageInfo, setMyPageInfo] = useState<MyPageInfo>();

  useEffect(() => {
    getMyPageInfo().then((res) => setMyPageInfo(res.result));

    ui.setUI((state) => ({
      ...state,
      headerTitle: '마이페이지',
      headerIcon: my,
      headerBackButtonEnabled: false,
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
  const handleLogoutClick = () => {
    modal
      .open({
        title: '로그아웃하시겠습니까?',
        description:
          '로그아웃 시 매물 리스트 및 작성한 콕리스트를 확인할 수 없습니다.',
        primaryButton: '로그아웃',
        secondaryButton: '돌아가기',
      })
      .then((res) => {
        if (res === 'primary') {
          logout();
          navigate('/login');
        }
      });
  };
  const handleQuitClick = () => {
    modal
      .open({
        title: '정말 탈퇴하시겠어요?',
        description: '탈퇴하기 선택 시 계정은 삭제되며 복구되지 않습니다.',
        primaryButton: '탈퇴하기',
        secondaryButton: '취소',
      })
      .then((res) => {
        if (res === 'primary') {
          // TODO: 탈퇴
          alert('탈퇴 기능은 아직 구현되지 않았습니다.');
        }
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.profile}>
        <img src="https://cdn.royalcanin-weshare-online.io/3DKT5m8BN5A8uWWASDMR/v4/ptpc1s3-welsh-pembroke-corgi-puppy-running-outside-in-a-garden" />
        <div className={styles.text}>
          <div className={styles.name}>{myPageInfo?.nickname}</div>
          <div className={styles.location}>#{myPageInfo?.address}</div>
          <div className={styles.tag}>
            <p>{myPageInfo?.transactionType}</p>
            <p>{myPageInfo?.realEstateType}</p>
            <p>
              ~{getPriceString(myPageInfo?.depositMax ?? 0)}/~
              {getPriceString(myPageInfo?.priceMax ?? 0)}
            </p>
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
          image={logoutIcon}
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
