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
      title: '성북구 정릉동',
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

  // 더 보기 구현
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const textLimit = useRef<number>(75);
  {
    /* 더보기 글자수 제한*/
  }
  const commenter = useMemo(() => {
    const shortReview: string = result.detail.slice(0, textLimit.current);

    if (result.detail.length > textLimit.current) {
      if (isShowMore) {
        return result.detail;
      }
      return shortReview;
    }
    return result.detail;
  }, [isShowMore, result.detail]);

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
        <div className={styles.moreViewCtn}>
          <div>{commenter}</div>
          <div
            className={styles.moreViewBtn}
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {result.detail.length > textLimit.current &&
              (isShowMore ? '닫기' : '더보기')}
          </div>
        </div>
      </div>
      <MidMenu />
      <Content />
      <BottomBtn text="콕리스트 수정하기" onClick={handleEditClick} />
    </div>
  );
};

export default KokItem;
