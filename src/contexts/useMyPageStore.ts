import { create } from 'zustand';

import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

interface MyPageInfo {
  nickname?: string;
  imageUrl?: string;
  address?: string;
  realEstateType?: HouseType;
  transactionType?: PriceType;
  priceMax?: number;
  depositMax?: number;
  priceMin?: number;
  depositMin?: number;

  setNickname: (nickname?: string) => void;
  setImageUrl: (imageUrl?: string) => void;
  setAddress: (address?: string) => void;
  setRealEstateType: (houseType: HouseType) => void;
  setTransactionType: (priceType: PriceType) => void;
  setPriceMax: (priceMax?: number) => void;
  setDepositMax: (depositMax?: number) => void;
  setPriceMin: (priceMin?: number) => void;
  setDepositMin: (depositMin?: number) => void;
}
const initialState: MyPageInfo = {
  nickname: undefined,
  imageUrl: undefined,
  address: undefined,
  realEstateType: undefined,
  transactionType: undefined,
  priceMax: undefined,
  depositMax: undefined,
  priceMin: undefined,
  depositMin: undefined,

  setNickname: () => {},
  setImageUrl: () => {},
  setAddress: () => {},
  setRealEstateType: () => {},
  setTransactionType: () => {},
  setPriceMax: () => {},
  setDepositMax: () => {},
  setPriceMin: () => {},
  setDepositMin: () => {},
};

const useMyPageStore = create<MyPageInfo>((set) => ({
  ...initialState,
  setNickname: (nickname) => set({ nickname }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setAddress: (address) => set({ address }),
  setRealEstateType: (realEstateType) => set({ realEstateType }),
  setTransactionType: (transactionType) => set({ transactionType }),
  setPriceMax: (priceMax) => set({ priceMax }),
  setDepositMax: (depositMax) => set({ depositMax }),
  setPriceMin: (priceMin) => set({ priceMin }),
  setDepositMin: (depositMin) => set({ depositMin }),
}));

export default useMyPageStore;
