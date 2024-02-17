import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

export default function Kok() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '매물 직접 등록하기',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'kok',
    });
  }, []);

  return <Outlet />;
}
