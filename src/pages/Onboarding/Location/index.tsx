import React from 'react';

import { AddressSearchPage } from 'components';
import { Address } from 'types/Address';

interface LocationProps {
  confirmLocation: (location: Address) => void;
  handleSkip: () => void;
}

export default function Location({
  confirmLocation,
  handleSkip,
}: LocationProps) {
  return (
    <AddressSearchPage
      confirmLocation={confirmLocation}
      skippable={true}
      onSkip={handleSkip}
      defaultAddress=""
    />
  );
}
