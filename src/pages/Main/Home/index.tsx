import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import useUIStore from 'contexts/uiStore';

export default function Home() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: false,

      path: 'home',
    }));
  }, []);

  const navigate = useNavigate();

  return <Outlet />;
}
