import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import backIcon from 'assets/img/line(2)/left_arrow.svg';
import useUIStore from 'contexts/uiStore';
import useAddressSearch from 'hooks/useAddressSearch';

import styles from './Search.module.css';

import type { Address } from 'types/Address';

export default function Home() {
  const ui = useUIStore();
  useEffect(() => {
    ui.setUI((state) => ({
      ...state,
      headerEnabled: false,
      naviEnabled: false,
      path: 'home',
    }));
  }, []);

  const navigate = useNavigate();

  function handleAddressClick(address: Address) {
    navigate(-1);
  }

  const [, , AddressSeachInput, AddressSearchResult, handleSubmit] =
    useAddressSearch(handleAddressClick);

  return (
    <div className={styles.root}>
      {/* 검색 상자 */}
      <div className={styles.top}>
        <button className="imgBtn">
          <img src={backIcon}></img>
        </button>
        <AddressSeachInput
          style="none"
          placeholder="어느 지역의 매물을 찾고 계신가요?"
          onSubmit={handleSubmit}
        />
      </div>

      {/* 최근 검색 */}
      <div className={styles.body}>
        <div className={styles.title}>최근 검색</div>
        <div className={styles.addressContainer}>
          <AddressSearchResult />
        </div>
      </div>
    </div>
  );
}
