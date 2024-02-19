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

      {/* content */}
      <div className={`${styles.body} ${ui.naviEnabled ? styles.padded : ''}`}>
        <div className={styles.header}>
          {ui.headerEnabled && (
            <Header
              title={ui.headerTitle}
              backBtnEnabled={ui.headerBackButtonEnabled}
              titleIcon={ui.headerIcon}
              buttons={ui.headerRightButtons}
            />
          )}
        </div>
        <Outlet />
      </div>

      {/* naviBar */}
      <div className={styles.footer}>{ui.naviEnabled && <NaviBar />}</div>
    </div>
  );
}
