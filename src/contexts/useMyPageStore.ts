import { create } from 'zustand';

import type { Gender } from 'pages/SignIn';
import type { Address } from 'types/Address';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';

interface MyPageInfo {
  imageUrl?: string;
  nickname?: string;
  birthday?: string;
  gender?: Gender;
  address?: Address;
  realEstateType?: HouseType;
  transactionType?: PriceType;

  //월세
  mpriceMin?: number;
  mpriceMax?: number;
  // 월세 보증금
  mdepositMin?: number;
  mdepositMax?: number;
  //전세 보증금
  ydepositMin?: number;
  ydepositMax?: number;
  //매매 가격
  priceMax?: number;
  priceMin?: number;

  setImageUrl: (imageUrl?: string) => void;
  setNickname: (nickname?: string) => void;
  setBirthday: (birthday?: string) => void;
  setGender: (birthday?: Gender) => void;
  setAddress: (address?: Address) => void;
  setRealEstateType: (houseType?: HouseType) => void;
  setTransactionType: (priceType?: PriceType) => void;
  setMPriceMin: (mpriceMin?: number) => void;
  setMPriceMax: (mpriceMax?: number) => void;
  setMDepositMin: (mdepositMin?: number) => void;
  setMDepositMax: (mdepositMax?: number) => void;
  setYDepositMin: (ydepositMin?: number) => void;
  setYDepositMax: (ydepositMax?: number) => void;
  setPriceMin: (priceMax?: number) => void;
  setPriceMax: (priceMin?: number) => void;
}
const initialState: MyPageInfo = {
  setImageUrl: () => {},
  setNickname: () => {},
  setBirthday: () => {},
  setGender: () => {},
  setAddress: () => {},
  setRealEstateType: () => {},
  setTransactionType: () => {},
  setMPriceMin: () => {},
  setMPriceMax: () => {},
  setMDepositMin: () => {},
  setMDepositMax: () => {},
  setYDepositMin: () => {},
  setYDepositMax: () => {},
  setPriceMin: () => {},
  setPriceMax: () => {},
};

const useMyPageStore = create<MyPageInfo>((set) => ({
  ...initialState,
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setNickname: (nickname) => set({ nickname }),
  setBirthday: (birthday) => set({ birthday }),
  setGender: (gender) => set({ gender }),
  setAddress: (address) => set({ address }),
  setRealEstateType: (realEstateType) => set({ realEstateType }),
  setTransactionType: (transactionType) => set({ transactionType }),

  setMPriceMin: (mpriceMin) => set({ mpriceMin }),
  setMPriceMax: (mpriceMax) => set({ mpriceMax }),
  setMDepositMin: (mdepositMin) => set({ mdepositMin }),
  setMDepositMax: (mdepositMax) => set({ mdepositMax }),
  setYDepositMin: (ydepositMin) => set({ ydepositMin }),
  setYDepositMax: (ydepositMax) => set({ ydepositMax }),

  setPriceMin: (priceMin) => set({ priceMin }),
  setPriceMax: (priceMax) => set({ priceMax }),
}));

export default useMyPageStore;
