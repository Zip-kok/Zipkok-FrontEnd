import React from 'react';

import { AddressSearchPage } from 'components';
import useAddressStore from 'contexts/addressStore';
import { Address } from 'types/Address';

export default function LocationEdit() {
  const { setAddress } = useAddressStore();

  return (
    <AddressSearchPage
      confirmLocation={(address) => setAddress(address)}
      skippable={true}
      defaultAddress=""
    />
  );
}
