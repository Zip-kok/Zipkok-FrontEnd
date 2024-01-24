import React from 'react';
import { Outlet } from 'react-router-dom';

import { NaviBar, Header } from 'components';
import useUIStore from 'contexts/uiStore';

import styles from './Main.module.css';

export default function Main() {
  const ui = useUIStore();

  return (
    <div className={styles.main}>
      {/* header */}
      <div className={styles.header}>
        {ui.headerEnabled && (
          <Header
            title={ui.headerTitle}
            backBtnEnabled={ui.headerBackButtonEnabled}
            titleIcon={ui.headerIcon}
          />
        )}
      </div>

      {/* content */}
      <div className={styles.body}>
        <Outlet />
      </div>

      {/* naviBar */}
      <div className={styles.footer}>{ui.naviEnabled && <NaviBar />}</div>
    </div>
  );
}
