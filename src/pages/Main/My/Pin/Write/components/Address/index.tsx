import React, { useState } from 'react';

import mapIcon from 'assets/img/line(2)/map.svg';
import searchIcon from 'assets/img/line(2)/search.svg';
import { BottomBtn } from 'components';
import useAddressSearch from 'hooks/useAddressSearch';

import styles from './Address.module.css';

import type { Address } from 'types/Address';

interface AddressProps {
  confirmLocation: (location: Address) => void;
  defaultAddress: string;
}

export default function Address({
  confirmLocation,
  defaultAddress,
}: AddressProps) {
  const [, addressCount, AddressSeachInput, AddressSearchResult, handleSubmit] =
    useAddressSearch(handleAddressClick, defaultAddress);

  const [inputValue, setInputValue] = useState<string>(defaultAddress);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setSelectedAddress(null);
    setInputValue(e.currentTarget.value);
  }

  function handleAddressClick(address: Address) {
    setInputValue(address.address_name);
    setSelectedAddress(address);
  }

  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>
        <AddressSeachInput
          placeholder="도로명, 지번 검색"
          value={inputValue}
          icon={searchIcon}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <button className={`imgBtn ${styles.mapBtn}`}>
          <img src={mapIcon} />
          <span>지도에서 위치 보기</span>
        </button>
      </div>

      <div className={styles.addressContainer}>
        <AddressSearchResult />
      </div>

      {(selectedAddress !== null || addressCount === 0) && (
        <BottomBtn
          onClick={() => {
            if (selectedAddress !== null) confirmLocation(selectedAddress);
            else handleSubmit();
          }}
          text="확인"
          disabled={inputValue === ''}
        />
      )}
    </div>
  );
}
