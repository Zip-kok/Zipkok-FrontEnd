import React from 'react';

import searchArrowIcon from 'assets/img/line(1)/search_arrow.svg';
import { Address } from 'types/Address';

import styles from './AddressBtn.module.css';

interface AddressBtnProps {
  address: Address;
  onClick: () => void;
}

export default function AddressBtn({ address, onClick }: AddressBtnProps) {
  return (
    <button
      className={styles.addressBtn}
      key={address.address_name}
      onClick={onClick}
    >
      <span>{address.address_name}</span>
      <img src={searchArrowIcon}></img>
    </button>
  );
}
