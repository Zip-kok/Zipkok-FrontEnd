import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import mapIcon from 'assets/img/line(2)/map.svg';
import { BottomBtn, TextInput, IconBtn } from 'components';
import useAddressStore from 'contexts/addressStore';
import useUIStore from 'contexts/uiStore';
import useAddressSearch from 'hooks/useAddressSearch';

import styles from './PropertyList.module.css';

import type { Address } from 'types/Address';

export default function PropertyList() {
  const { setAddress, resetSrc } = useAddressStore();

  function handleAddressClick(address: Address) {
    setAddress(address, 'new_kok');
    navigate('/kok/new/propertyMap');
  }

  const [, , AddressSeachInput, AddressSearchResult, handleSubmit] =
    useAddressSearch(handleAddressClick);

  const ui = useUIStore();
  useEffect(() => {
    ui.setUI({
      naviEnabled: false,
      headerEnabled: true,
      headerTitle: '매물 선택하기',
      headerBackButtonEnabled: true,
      headerRightButtons: [],
      path: 'kok',
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.searchBox}>
        <AddressSeachInput
          style="underline"
          placeholder="도로명, 지번 검색"
          onSubmit={handleSubmit}
        />
        <IconBtn
          image={mapIcon}
          text="지도에서 위치 보기"
          onClick={() => {
            resetSrc();
            navigate('../propertyMap');
          }}
          gap="8px"
          height="36px"
        />
      </div>

      <div className={styles.addressContainer}>
        <AddressSearchResult />
      </div>

      <BottomBtn
        text="매물 직접 등록하기"
        onClick={() => navigate('../../custom')}
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
}
