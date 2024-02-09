import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

export default function NewKok() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
      headerRightButtons: [],
    }));
  }, []);

  return <Outlet />;
}
