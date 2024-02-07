import React, { useState, useCallback } from 'react';
import BarLoader from 'react-spinners/BarLoader';

import { searchAddress } from 'apis';
import { TextInput } from 'components';
import { Address } from 'types/Address';
import { StatusCode } from 'types/StatusCode';

import { AddressContainer } from './components';

import type { TextInputProps } from 'components/TextInput';

export default function useAddressSearch(
  handleAddressClick: (address: Address) => void,
  defaultAddress = '',
) {
  const [inputValue, setInputValue] = useState<string>(defaultAddress);
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressCount, setAddressCount] = useState(0);

  async function loadMoreAddresses() {
    if (isLoading) return;
    if (addresses.length < addressCount) {
      setIsLoading(true);

      const data = await searchAddress(
        query,
        Math.floor(addresses.length / 30) + 1,
        30,
      );

      setIsLoading(false);

      if (data === null) {
        setError('주소를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
        setAddresses([]);
        return;
      }

      setError('');
      setAddresses((prev) => [...prev, ...data.result.documents]);
    }
  }

  async function handleSubmit() {
    const query = inputValue.replace(/\s/g, '');
    setQuery(query);
    setIsLoading(true);

    const data = await searchAddress(query);
    setIsLoading(false);

    if (data === null) {
      setError('주소를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
      setAddresses([]);
      return;
    }

    setAddressCount(data.result.meta.total_count);
    if (data.result.meta.total_count === 0) {
      if (data.code === StatusCode.ADDRESS_SEARCH_SUCCESS)
        setError('일치하는 검색 결과가 없어요.\n주소를 다시 확인해주세요.');
      else setError(data.message);
    } else {
      setError('');
      setAddresses(data.result.documents);
    }
  }

  const AddressSeachInput = useCallback(
    ({ defaultValue: defaultAddress, ...props }: TextInputProps) => {
      function handleChange(e: React.FormEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value);
        props.onChange?.(e);
      }

      return <TextInput {...props} onChange={handleChange} />;
    },
    [],
  );

  const AddressSearchResult = () => (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <BarLoader color="#4b5259" />
        </div>
      ) : (
        <AddressContainer
          errorMessage={error}
          addresses={addresses}
          onClick={handleAddressClick}
          onEndOfScroll={loadMoreAddresses}
        />
      )}
    </>
  );

  return [
    addresses,
    addressCount,
    AddressSeachInput,
    AddressSearchResult,
    handleSubmit,
  ] as [
    typeof addresses,
    typeof addressCount,
    typeof AddressSeachInput,
    typeof AddressSearchResult,
    typeof handleSubmit,
  ];
}
