import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import searchIcon from 'assets/img/line(2)/search.svg';
import { BottomBtn } from 'components';
import useAddressSearch from 'hooks/useAddressSearch';
import { Address } from 'types/Address';

import styles from './AddressSearchPage.module.css';

interface AddressSearchPageProps {
  confirmLocation: (location: Address) => void;
  skippable?: boolean;
  onSkip?: () => void;
  defaultAddress?: Address;
}

export default function AddressSearchPage({
  confirmLocation,
  skippable = true,
  onSkip = () => navigate('/'),
  defaultAddress,
}: AddressSearchPageProps) {
  const [, addressCount, AddressSeachInput, AddressSearchResult, handleSubmit] =
    useAddressSearch(handleAddressClick, defaultAddress);

  const [inputValue, setInputValue] = useState<string>(
    defaultAddress?.address_name ?? '',
  );
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setSelectedAddress(null);
    setInputValue(e.currentTarget.value);
  }

  function handleAddressClick(address: Address) {
    setInputValue(address.address_name);
    setSelectedAddress(address);
  }

  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1>
          희망 거주 지역을
          <br />
          알려주세요.
        </h1>
      </div>

      <div className={styles.inputContainer}>
        <AddressSeachInput
          placeholder="도로명, 지번 검색"
          value={inputValue}
          icon={searchIcon}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          caption={
            addressCount > 0
              ? `${addressCount.toLocaleString()}건의 검색 결과`
              : undefined
          }
        />
      </div>

      <AddressSearchResult />
      {(selectedAddress !== null || addressCount === 0) && (
        <BottomBtn
          onClick={() => {
            if (selectedAddress !== null) confirmLocation(selectedAddress);
            else handleSubmit();
          }}
          text="확인"
          onAnchorClick={onSkip}
          anchorText={skippable ? '나중에 설정하기' : undefined}
          disabled={inputValue === ''}
          occupySpace
        />
      )}
    </div>
  );
}
