import React from 'react';

import styles from './Map.module.css';

import type { Step } from '../..';

interface MapProps {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

export default function Map({ setStep }: MapProps) {
  return <div></div>;
}
