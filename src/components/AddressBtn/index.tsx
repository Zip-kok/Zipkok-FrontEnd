import React from 'react';
import styles from './AddressBtn.module.css';
import { Address } from '../../types/Address';
import searchArrowIcon from '../../assets/img/line(1)/search_arrow.svg';

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
