import React, { useState } from 'react';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';

import LoginInput from '../../../components/LoginInput';
import AddressContainer from '../../../components/AddressContainer';
import BottomBtn from '../../../components/BottomBtn';

import styles from './Location.module.css';
import Address from '../../../types/Address';

import searchIcon from '../../../assets/img/search.svg';

import { JUSO_KEY } from '../../../api/keys';

interface LocationProps {
  confirmLocation: (location: string) => void;
}

export default function Location({ confirmLocation }: LocationProps) {
  const countPerPage = 50;

  const isKeyboardOpen = useDetectKeyboardOpen();

  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressCount, setAddressCount] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  async function searchAddress(query: string, page: number = 1) {
    const url = 'https://www.juso.go.kr/addrlink/addrLinkApi.do';
    const params = {
      confmKey: JUSO_KEY,
      resultType: 'json',
      keyword: query,
      currentPage: page.toString(),
      countPerPage: countPerPage.toString(),
    };
    const paramStr = new URLSearchParams(params).toString();

    try {
      const res = await fetch(`${url}?${paramStr}`);
      const data = await res.json();
      return await data.results;
    } catch (e) {
      return null;
    }
  }

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setSelectedAddress(null);
    setInputValue(e.currentTarget.value);
  }

  function handleAddressClick(address: Address) {
    setInputValue(address.roadAddr);
    setAddresses([]);
    setSelectedAddress(address);
  }

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

      <LoginInput
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
          onAnchorClick={() => {}}
          anchorText="나중에 설정하기"
          isKeyboardOpen={isKeyboardOpen}
          disabled={inputValue === ''}
        />
      )}
    </div>
  );
}
