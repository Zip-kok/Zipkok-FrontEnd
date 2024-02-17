import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddressSearchPage } from 'components';
import useAddressStore from 'contexts/addressStore';
import useUIStore from 'contexts/uiStore';

export default function LocationEdit() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '프로필 수정하기',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'home',
    });
  }, []);

  const navigate = useNavigate();
  const addressStore = useAddressStore();

  return (
    <AddressSearchPage
      confirmLocation={(address) => {
        addressStore.setAddress(address, 'profileEdit');
        navigate(-1);
      }}
      defaultAddress={addressStore.address}
      skippable={false}
    />
  );
}
