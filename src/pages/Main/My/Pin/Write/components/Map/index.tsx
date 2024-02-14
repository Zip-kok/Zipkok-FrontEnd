import React, { useState, useRef } from 'react';

import locationIcon from 'assets/img/line(1)/location.svg';

import KakaoMap, { KakaoMapRef } from './KakaoMap';
import styles from './Map.module.css';

import type { Address } from 'types/Address';

interface MapProps {
  confirmLocation: (location: Address) => void;
}

export default function Map({ confirmLocation }: MapProps) {
  const mapRef = useRef<KakaoMapRef>(null);
  const [address, setAddress] = useState<Address>();

  return (
    <div className={styles.root}>
      <KakaoMap setAddress={setAddress} ref={mapRef} />
      <div className={styles.bottom}>
        <h1>{address?.address_name}</h1>
        <button
          className={`imgBtn ${styles.locationBtn}`}
          onClick={mapRef.current?.getCurrentPosBtn}
        >
          <img src={locationIcon} />
          <span>현재 위치로 설정</span>
        </button>
      </div>
    </div>
  );
}
