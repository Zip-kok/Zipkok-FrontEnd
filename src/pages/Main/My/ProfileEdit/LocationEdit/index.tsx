import React from 'react';

import { AddressSearchPage } from 'components';
import useAddressStore from 'contexts/addressStore';

export default function LocationEdit() {
  const setAddress = useAddressStore((state) => state.setAddress);

  return (
    <AddressSearchPage
      confirmLocation={(address) => setAddress(address)}
      skippable={true}
      defaultAddress=""
    />
  );
}
