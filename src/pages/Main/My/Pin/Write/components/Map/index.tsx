import React, { useState } from 'react';

import KakaoMap from './KakaoMap';
import styles from './Map.module.css';

import type { Address } from 'types/Address';

interface MapProps {
  confirmLocation: (location: Address) => void;
}

export default function Map({ confirmLocation }: MapProps) {
  const [address, setAddress] = useState<Address>();

  return (
    <div className={styles.root}>
      <KakaoMap setAddress={setAddress} />
    </div>
  );
}
