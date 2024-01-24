import React from 'react';

import { AddressSearchPage } from 'components';
import useAddressStore from 'contexts/addressStore';
import { Address } from 'types/Address';

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
