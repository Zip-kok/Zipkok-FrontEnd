import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

export default function Kok() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: true,
      path: 'kok',
    }));
  }, []);

  return <Outlet />;
}