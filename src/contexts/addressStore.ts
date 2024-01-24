import { create } from 'zustand';

import type { Address } from 'types/Address';

export interface AddressStore {
  address: Address;
  setAddress: (address: Address) => void;
}

const initialState: AddressStore = {
  address: {
    address_name: '',
    x: 0,
    y: 0,
  },
  setAddress: () => {},
};

const useAddressStore = create<AddressStore>((set) => ({
  ...initialState,

  setAddress: (address) => {
    set((state) => ({
      ...state,
      address,
    }));
  },
}));

export default useAddressStore;
