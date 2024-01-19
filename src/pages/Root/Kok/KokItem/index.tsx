import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useNaviStore from '../../../../contexts/naviStore';

import Header from '../../../../components/Header';

import styles from './KokItem.module.css';
import useMenu from '../../../../hooks/useMenu';
import BasicInf from './BasicInf';
import NearHome from './NearHome';
import InsideHome from './InsideHome';
import Contract from './Contract';
import ReView from './ReView';

export default function KokItem() {
  const navigate = useNavigate();

  // 하단 내비게이션 바 설정
  const { setNaviMenu, setShowNaviBar } = useNaviStore();
  useEffect(() => {
    setNaviMenu('kok');
    setShowNaviBar(true);
  }, []);

  const { kokId } = useParams<{ kokId: string }>();

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
  ])

  return (
  <div className={styles.root}>
    <Header title="성북구 정릉동" 
    backBtnEnabled
    heartBtnEnabled
    shareBtnEnabled
    onBack={() => navigate(-1)}
    />  
    <img></img>

    <div className={styles.body}>
      <div className={styles.address}>서울시 관악구 신림동 123-123</div>
      <div className={styles.priceContainer}>
        <div className={styles.priceType}>월세</div>
        <div className={styles.priceInf}>1000/50</div>
      </div>
      <div>국민대 리모델링 분리식 풀옵션 2층 엘레베이터
        <br />북한신보국문역 도보 3분<br />
        국민대 리모델링 분리식 풀옵션 2층 엘레베이터....
      </div>
    </div>

    <MidMenu />
    <Content />
  </div>
)}
