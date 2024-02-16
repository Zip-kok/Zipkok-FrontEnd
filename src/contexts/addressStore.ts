import { create } from 'zustand';

import type { Address } from 'types/Address';

export interface AddressStore {
  address: Address;
  src?: string;
  setAddress: (address: Address, src?: string) => void;
  resetSrc: () => void;
}

const initialState: AddressStore = {
  address: {
    address_name: '',
    x: 0,
    y: 0,
  },
  setAddress: () => {},
  resetSrc: () => {},
};

const useAddressStore = create<AddressStore>((set) => ({
  ...initialState,

  setAddress: (address, src?: string) => {
    set((state) => ({
      ...state,
      address,
      src,
    }));
  },

  resetSrc: () => {
    set((state) => ({
      ...state,
      src: undefined,
    }));
  },
}));

export default useAddressStore;
