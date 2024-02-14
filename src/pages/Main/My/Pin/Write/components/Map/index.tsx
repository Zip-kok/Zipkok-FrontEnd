import React from 'react';

import styles from './Map.module.css';

import type { Address } from 'types/Address';

interface MapProps {
  confirmLocation: (location: Address) => void;
}

export default function Map({ confirmLocation }: MapProps) {
  return <div></div>;
}
