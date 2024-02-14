import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPin, patchPin, postPin } from 'apis';
import useUIStore from 'contexts/uiStore';

import { Address as AddressPage, Map, Name } from './components';
import styles from './Write.module.css';

import type { Address } from 'types/Address';
import type { Pin } from 'types/Pin';

type PinWithoutId = Omit<Pin, 'id'>;
export type Step = 'address' | 'map' | 'name';

export default function Write() {
  const ui = useUIStore();
  const pinId = useParams<{ pinId: string }>().pinId;
  const [step, setStep] = useState<Step>('address');
  const [pin, setPin] = useState<PinWithoutId>({
    name: '',
    address: {
      address_name: '',
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerTitle: pinId !== undefined ? '핀 수정하기' : '핀 등록하기',
      headerIcon: undefined,
      headerBackButtonEnabled: true,
      naviEnabled: false,
    }));

    if (pinId !== undefined) {
      getPin(parseInt(pinId)).then((res) => {
        setPin(res.result as Pin);
      });
    }
  }, []);

  const handleAddressSubmit = (address: Address) => {
    setPin((prev) => ({
      ...prev,
      address: {
        address_name: address.address_name,
        x: address.x,
        y: address.y,
      },
    }));
    setStep('name');
  };

  return (
    <div className={styles.root}>
      {step === 'address' && (
        <AddressPage
          confirmLocation={handleAddressSubmit}
          defaultAddress={pin.address.address_name}
        />
      )}
      {step === 'map' && <Map confirmLocation={handleAddressSubmit} />}
      {step === 'name' && <Name />}
    </div>
  );
}
