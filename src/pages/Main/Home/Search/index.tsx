import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import deleteIcon from 'assets/img/line(1)/delete.svg';
import backIcon from 'assets/img/line(2)/left_arrow.svg';
import useUIStore from 'contexts/uiStore';
import useAddressSearch from 'hooks/useAddressSearch';

import styles from './Search.module.css';

import type { Address } from 'types/Address';

interface AddressHistory {
  id: number;
  address: Address;
  date: string;
}

export default function Home() {
  const [searched, setSearched] = useState(false);

  const ui = useUIStore();
  const [recentSearch, setRecentSearch] = useState<AddressHistory[]>(
    JSON.parse(localStorage.getItem('recentSearch') || '[]'),
  );

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
    localStorage.setItem(
      'recentSearch',
      JSON.stringify([
        {
          id: Math.random().toString(16),
          address,
          date: `${new Date().getMonth() + 1}. ${new Date().getDate()}.`,
        },
        ...recentSearch,
      ]),
    );
    navigate(-1);
  }

  const [, addressCount, AddressSeachInput, AddressSearchResult, handleSubmit] =
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
          onSubmit={() => {
            handleSubmit();
            setSearched(true);
          }}
        />
      </div>

      <div className={styles.body}>
        {/* 최근 검색 */}
        {!searched && (
          <>
            <div className={styles.title}>최근 검색</div>
            <div className={styles.addressContainer}>
              {recentSearch.length === 0 && (
                <div className={styles.message}>
                  최근 검색 결과가 없어요.
                  <br />
                  주소를 입력해서 검색해주세요.
                </div>
              )}

              {recentSearch.map((history) => (
                <RecentAddress
                  history={history}
                  setRecentSearch={setRecentSearch}
                  key={history.id}
                />
              ))}
            </div>
          </>
        )}

        {/* 검색 결과 */}
        {searched && (
          <>
            <div className={styles.title}>
              {addressCount.toLocaleString()}건의 검색 결과
            </div>
            <div className={styles.addressContainer}>
              <AddressSearchResult />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface RecentAddressProps {
  history: AddressHistory;
  setRecentSearch: React.Dispatch<React.SetStateAction<AddressHistory[]>>;
}

function RecentAddress({ history, setRecentSearch }: RecentAddressProps) {
  function handleDelete() {
    const recentSearch = JSON.parse(
      localStorage.getItem('recentSearch') || '[]',
    ) as AddressHistory[];

    localStorage.setItem(
      'recentSearch',
      JSON.stringify(recentSearch.filter((item) => item.id !== history.id)),
    );
    setRecentSearch(recentSearch.filter((item) => item.id !== history.id));
  }

  return (
    <div className={styles.recent}>
      <button className={styles.recentButton}>
        {history.address.address_name}
      </button>
      <div className={styles.recentRight}>
        <span>{history.date}</span>
        <button className="imgBtn" onClick={handleDelete}>
          <img src={deleteIcon}></img>
        </button>
      </div>
    </div>
  );
}
