import { create } from 'zustand';

export interface AddressStore {
  address: string;
  setAddress: (address: string) => void;
}

const initialState: AddressStore = {
  address: '서울특별시 광진구 능동로 120 (화양동)',
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
