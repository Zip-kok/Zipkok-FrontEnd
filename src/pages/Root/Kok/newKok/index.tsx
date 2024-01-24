import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { Header } from 'components';

import styles from './NewKok.module.css';

/*
newKok/propertyList: 콕리스트 작성_매물리스트
newKok/customProperty: 콕리스트 작성_매물리스트_직접입력
newKok/write: 콕리스트 작성_체크 (=수정하기 화면 동일)
*/
type SubPath = 'propertyList' | 'customProperty' | 'write';

const title = {
  propertyList: '매물 선택하기',
  customProperty: '매물 직접 등록하기',
  write: '콕리스트 작성',
} as Record<SubPath, string>;

export default function NewKok() {
  const location = useLocation();
  const navigate = useNavigate();
  const subPath = location.pathname.split('/')[3] as SubPath;

  return (
    <div className={styles.root}>
      <div className="top">
        <Header
          title={title[subPath]}
          backBtnEnabled
          onBack={() => navigate(-1)}
        />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
