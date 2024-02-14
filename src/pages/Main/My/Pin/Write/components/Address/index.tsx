import React from 'react';

import styles from './Address.module.css';

import type { Step } from '../..';

interface AddressProps {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
}

export default function Address({ setStep }: AddressProps) {
  return <div></div>;
}
