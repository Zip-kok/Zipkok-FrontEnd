import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { searchAddress } from 'apis';
import searchIcon from 'assets/img/line(2)/search.svg';
import { TextInput, BottomBtn, AddressContainer } from 'components';
import { Address } from 'types/Address';
import { StatusCode } from 'types/StatusCode';

import styles from './Location.module.css';

interface LocationProps {
  confirmLocation: (location: Address) => void;
  skippable?: boolean;
  defaultAddress?: string;
}

export default function Location({
  confirmLocation,
  skippable = true,
  defaultAddress = '',
}: LocationProps) {
  const countPerPage = 50;

  const [inputValue, setInputValue] = useState<string>(defaultAddress);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressCount, setAddressCount] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setSelectedAddress(null);
    setInputValue(e.currentTarget.value);
  }

  function handleAddressClick(address: Address) {
    setInputValue(address.address_name);
    setAddresses([]);
    setSelectedAddress(address);
  }

  const navigate = useNavigate();
  const handleSkipBtnClick = () => {
    navigate('/');
  };

  function loadMoreAddresses() {
    if (selectedAddress || isLoading) return;
    if (addresses.length < addressCount) {
      setIsLoading(true);
      searchAddress(
        query,
        Math.floor(addresses.length / countPerPage) + 1,
      ).then((data) => {
        if (data === null) {
          setErrorMessage(
            '주소를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.',
          );
          setAddresses([]);
        } else {
          setErrorMessage('');
          setAddresses((prev) => [...prev, ...data.result.documents]);
        }
        setIsLoading(false);
      });
    }
  }

  async function handleSubmit() {
    if (inputValue === '') return;
    if (selectedAddress) {
      confirmLocation(selectedAddress);
    } else {
      const query = inputValue.replace(/\s/g, '');

      setQuery(query);
      const data = await searchAddress(query);

      if (data === null) {
        setErrorMessage(
          '주소를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.',
        );
        setAddresses([]);
        return;
      }

      const count = data.result.meta.total_count;
      setAddressCount(count);

      if (count === 0) {
        if (data.code === StatusCode.ADDRESS_SEARCH_FAILURE)
          setErrorMessage(
            '일치하는 검색 결과가 없어요.\n주소를 다시 확인해주세요.',
          );
        else setErrorMessage(data.message);
        setAddresses([]);
      } else {
        setErrorMessage('');
        setAddresses(data.result.documents);
      }
    }
  }

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
        <TextInput
          placeholder="도로명, 지번 검색"
          value={inputValue}
          icon={searchIcon}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          caption={
            addresses.length > 0 || errorMessage !== ''
              ? `${addressCount.toLocaleString()}건의 검색 결과`
              : undefined
          }
        />
      </div>

      <AddressContainer
        errorMessage={errorMessage}
        addresses={addresses}
        onClick={handleAddressClick}
        onEndOfScroll={loadMoreAddresses}
      />
      {addresses.length === 0 && (
        <BottomBtn
          onClick={handleSubmit}
          text="확인"
          onAnchorClick={() => navigate('/')}
          anchorText={skippable ? '나중에 설정하기' : undefined}
          disabled={inputValue === ''}
          occupySpace
        />
      )}
    </div>
  );
}
