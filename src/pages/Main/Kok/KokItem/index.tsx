import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomBtn, SwiperCom, Swiper_modal } from 'components';
import useUIStore from 'contexts/uiStore';
import useMenu from 'hooks/useMenu';
import data from 'models/kokItemDetail.json';
import 'swiper/css';
import 'swiper/css/pagination';

import BasicInf from './components/BasicInf';
import Contract from './components/Contract';
import InsideHome from './components/InsideHome';
import NearHome from './components/NearHome';
import ReView from './components/ReView';
import styles from './KokItem.module.css';

const KokItem = () => {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '성북구 정릉동',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('../../kok');
  };
  const { code, message, result } = data;

  const [MidMenu, Content, menuIndex] = useMenu([
    {
      name: '기본정보',
      element: <BasicInf />,
    },
    {
      name: '집 주변',
      element: <NearHome />,
    },
    {
      name: '집 내부',
      element: <InsideHome />,
    },
    {
      name: '중개 계약',
      element: <Contract />,
    },
    {
      name: '후기',
      element: <ReView />,
    },
  ]);
  // 모달 구현
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  //더보기 구현
  const [moreView, setMoreView] = useState(false);
  const charCount = result.detail.length;
  const handleMoreBtn = () => {
    setMoreView(!moreView);
  };

  const showMoreBtn = () => {
    const lineCount = result.detail.split('\n').length;
    return lineCount > 3 || charCount > 86;
  };

  return (
    <div className={styles.root}>
      <SwiperCom imageUrls={result.imageInfo.imageUrls} onClick={showModal} />
      {modalOpen && (
        <Swiper_modal
          imageUrls={result.imageInfo.imageUrls}
          setModalOpen={setModalOpen}
        />
      )}
      <div className={styles.body}>
        <div className={styles.address}>{result.address}</div>
        <div className={styles.priceContainer}>
          <div className={styles.priceType}>{result.transactionType}</div>
          <div className={styles.priceInf}>
            {result.deposit + ' / '}
            {result.price}
          </div>
        </div>
        <div className={styles.detailCtn}>
          {/* styles.moreView 클래스를 가진 div의 내용을 shouldShowMoreButton의 결과에 따라 다르게 렌더링 */}
          <div className={moreView ? '' : styles.moreView}>{result.detail}</div>
          {showMoreBtn() && (
            <button onClick={handleMoreBtn}>{moreView ? '' : '더보기'}</button>
          )}
        </div>
      </div>
      <div className={styles.menu}>
        <MidMenu />
      </div>
      <Content />
      <BottomBtn text="콕리스트 수정하기" onClick={handleEditClick} />
    </div>
  );
};

export default KokItem;
