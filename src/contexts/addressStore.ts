import { create } from 'zustand';

export interface AddressStore {
  address: string;
  setAddress: (address: string) => void;
}

const initialState: AddressStore = {
  address: '',
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
