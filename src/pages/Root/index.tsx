import React from 'react';
import { Outlet } from 'react-router-dom';

import { NaviBar, Header } from 'components';
import useUIStore from 'contexts/uiStore';

import styles from './Root.module.css';

export default function Root() {
  const ui = useUIStore();

  return (
    <div className={styles.root}>
      {/* header */}
      {ui.showHeader && (
        <Header title={ui.title} backBtnEnabled={ui.backBtnEnabled} />
      )}

      {/* content */}
      <div className={styles.content}>
        <Outlet />
      </div>

      {/* naviBar */}
      {ui.showNaviBar && <NaviBar />}
    </div>
  );
}
