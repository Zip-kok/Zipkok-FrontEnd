import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getPin, putPin, postPin } from 'apis';
import useUIStore from 'contexts/uiStore';

import { Address as AddressPage, Map, Name } from './components';
import styles from './Write.module.css';

import type { Address } from 'types/Address';
import type { Pin } from 'types/Pin';

type PinWithoutId = Omit<Pin, 'id'>;
export type Step = 'address' | 'map' | 'name';

export default function Write() {
  const navigate = useNavigate();
  const ui = useUIStore();
  const pinId = useParams<{ pinId: string }>().pinId;
  const [pinLoaded, setPinLoaded] = useState(false);
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
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: pinId !== undefined ? '핀 수정하기' : '핀 등록하기',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'my',
    });

    if (pinId !== undefined) {
      getPin(parseInt(pinId)).then((res) => {
        setPin(res.result as Pin);
        setPinLoaded(true);
      });
    } else {
      setPinLoaded(true);
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

  const handlePinSubmit = (name: string, detailAddress: string) => {
    const data = {
      id: pinId !== undefined ? parseInt(pinId) : undefined,
      name,
      address: {
        address_name: `${pin.address.address_name} ${detailAddress}`,
        x: pin.address.x,
        y: pin.address.y,
      },
    };

    const callback = () => {
      navigate(-1);
    };

    // 핀 수정하기
    if (pinId !== undefined) {
      putPin(data as Pin).then(callback);
      // 핀 등록하기
    } else {
      postPin(data as PinWithoutId).then(callback);
    }
  };

  return (
    <div className={styles.root}>
      {pinLoaded && (
        <>
          {step === 'address' && (
            <AddressPage
              confirmLocation={handleAddressSubmit}
              showMap={() => setStep('map')}
              defaultAddress={
                pinId !== undefined
                  ? {
                      address_name: pin.address.address_name,
                      x: pin.address.x,
                      y: pin.address.y,
                    }
                  : undefined
              }
            />
          )}
          {step === 'map' && (
            <Map
              confirmLocation={handleAddressSubmit}
              defaultAddress={
                pinId !== undefined
                  ? {
                      address_name: pin.address.address_name,
                      x: pin.address.x,
                      y: pin.address.y,
                    }
                  : undefined
              }
            />
          )}
          {step === 'name' && <Name pin={pin} confirm={handlePinSubmit} />}
        </>
      )}
    </div>
  );
}
