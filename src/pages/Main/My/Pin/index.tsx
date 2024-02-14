import React, { useEffect } from 'react';

import useUIStore from 'contexts/uiStore';

import styles from './Pin.module.css';

export default function Pin() {
  const ui = useUIStore();

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '나의 핀 관리',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);

  return <div></div>;
}
