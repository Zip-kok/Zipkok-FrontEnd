import React from 'react';

import deleteIcon from 'assets/img/line(1)/delete.svg';

import styles from './RecentAddress.module.css';

import type { AddressHistory } from '../../';
import type { Address } from 'types/Address';

interface RecentAddressProps {
  history: AddressHistory;
  onClick: (history: AddressHistory) => void;
  setRecentSearch: React.Dispatch<React.SetStateAction<AddressHistory[]>>;
}

export default function RecentAddress({
  history,
  onClick,
  setRecentSearch,
}: RecentAddressProps) {
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
      <button className={styles.recentButton} onClick={() => onClick(history)}>
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
