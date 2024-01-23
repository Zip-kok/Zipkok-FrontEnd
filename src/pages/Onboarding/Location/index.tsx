import React, { useState } from 'react';

import styles from './Location.module.css';

import searchAddress from './searchAddress';
import TextInput from '../../../components/TextInput';
import BottomBtn from '../../../components/BottomBtn';
import AddressContainer from '../../../components/AddressContainer';
import Address from '../../../types/Address';

import searchIcon from '../../../assets/img/line(1)/search.svg';
import { useNavigate } from 'react-router-dom';

interface LocationProps {
  confirmLocation: (location: string) => void;
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
    setInputValue(address.roadAddr);
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
          setAddresses((prev) => [...prev, ...(data.juso as Address[])]);
        }
        setIsLoading(false);
      });
    }
  }

  async function handleSubmit() {
    if (inputValue === '') return;
    if (selectedAddress) {
      confirmLocation(selectedAddress.roadAddr);
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

      const count = data.common.totalCount;
      setAddressCount(parseInt(count));

      if (count === '0') {
        if (data.common.errorMessage === '정상')
          setErrorMessage(
            '일치하는 검색 결과가 없어요.\n주소를 다시 확인해주세요.',
          );
        else setErrorMessage(data.common.errorMessage);
        setAddresses([]);
      } else {
        setErrorMessage('');
        setAddresses(data.juso as Address[]);
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
