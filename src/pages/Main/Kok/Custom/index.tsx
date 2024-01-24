import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

export default function Kok() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      naviEnabled: false,
      headerIcon: undefined,
      headerTitle: '매물 직접 등록하기',
      headerBackButtonEnabled: true,
    }));
  }, []);

  return <Outlet />;
}
