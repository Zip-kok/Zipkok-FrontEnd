import React from 'react';

import { Address } from 'types/Address';

import styles from './AddressContainer.module.css';
import AddressBtn from '../AddressBtn';

interface AddressContainerProps {
  errorMessage?: string;
  addresses: Address[];
  onClick: (address: Address) => void;
  onEndOfScroll?: () => void;
}

export default function AddressContainer({
  errorMessage,
  addresses,
  onClick,
  onEndOfScroll,
}: AddressContainerProps) {
  function handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (Math.abs(scrollHeight - scrollTop - clientHeight) <= 10) {
      if (onEndOfScroll) onEndOfScroll();
    }
  }

  return (
    <div className={styles.container} onScroll={handleScroll}>
      {errorMessage !== '' ? (
        <span className={styles.errorMessage}>{errorMessage}</span>
      ) : (
        addresses.map((address) => (
          <AddressBtn
            key={address.address_name}
            address={address}
            onClick={() => onClick(address)}
          />
        ))
      )}
    </div>
  );
}
