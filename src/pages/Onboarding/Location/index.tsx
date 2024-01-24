import React from 'react';

import { AddressSearchPage } from 'components';
import { Address } from 'types/Address';

interface LocationProps {
  confirmLocation: (location: Address) => void;
}

export default function Location({ confirmLocation }: LocationProps) {
  return (
    <AddressSearchPage
      confirmLocation={confirmLocation}
      skippable={true}
      defaultAddress=""
    />
  );
}
