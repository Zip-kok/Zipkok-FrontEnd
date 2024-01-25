import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddressSearchPage } from 'components';
import useAddressStore from 'contexts/addressStore';
import useUIStore from 'contexts/uiStore';

export default function LocationEdit() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: '프로필 수정하기',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));
  }, []);

  const navigate = useNavigate();
  const setAddress = useAddressStore((state) => state.setAddress);

  return (
    <AddressSearchPage
      confirmLocation={(address) => {
        setAddress(address);
        navigate(-1);
      }}
      skippable={false}
      defaultAddress=""
    />
  );
}
