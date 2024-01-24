import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAddressStore from 'contexts/addressStore';
import Location from 'pages/Onboarding/Location';

import styles from './AddressSearch.module.css';
import Header from '../Header';

interface AddressSearchProps {
  title?: string;
  headerDisabled?: boolean;
}

export default function AddressSearch({
  title = '',
  headerDisabled = false,
}: AddressSearchProps) {
  const { address, setAddress } = useAddressStore((state) => state);
  const navigate = useNavigate();

  return (
    <>
      {!headerDisabled && (
        <div className="top">
          <Header title={title} backBtnEnabled onBack={() => navigate(-1)} />
        </div>
      )}

      <div className={styles.content}>
        <Location
          defaultAddress={address}
          confirmLocation={(location) => {
            setAddress(location);
            navigate(-1);
          }}
          skippable={false}
        />
      </div>
    </>
  );
}
