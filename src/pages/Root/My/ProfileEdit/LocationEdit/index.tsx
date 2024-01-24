import React from 'react';

import { AddressSearchPage } from 'components';
import { Address } from 'types/Address';

interface LocationEditProps {
  confirmLocation: (location: Address) => void;
}

export default function LocationEdit({ confirmLocation }: LocationEditProps) {
  return (
    <AddressSearchPage
      confirmLocation={confirmLocation}
      skippable={true}
      defaultAddress=""
    />
  );
}
