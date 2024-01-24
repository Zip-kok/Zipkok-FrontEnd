import { HouseType, PriceType } from 'pages/Onboarding';
import { create } from 'zustand';

export interface CustomKokStore {
  picture?: string;
  address: string;
  memo?: string;
  deposit?: number;
  monthlyPrice?: number;
  price?: number;
  maintanenceFee?: number;
  detailAddress?: string;
  area?: number;
  floor?: number;
  houseType: HouseType;
  priceType: PriceType;
  nickName?: string;

  setPicture: (picture?: string) => void;
  setAddress: (address: string) => void;
  setMemo: (memo?: string) => void;
  setDeposit: (deposit?: number) => void;
  setMonthlyPrice: (monthlyPrice?: number) => void;
  setPrice: (price?: number) => void;
  setMaintanenceFee: (maintanenceFee?: number) => void;
  setDetailAddress: (detailAddress?: string) => void;
  setArea: (area?: number) => void;
  setFloor: (floor?: number) => void;
  setHouseType: (houseType: HouseType) => void;
  setPriceType: (priceType: PriceType) => void;
  setNickName: (nickName?: string) => void;
}

const initialState: CustomKokStore = {
  address: '',
  memo: undefined,
  deposit: undefined,
  monthlyPrice: undefined,
  price: undefined,
  maintanenceFee: undefined,
  detailAddress: undefined,
  area: undefined,
  floor: undefined,
  houseType: '원룸',
  priceType: '월세',
  nickName: undefined,

  setPicture: () => {},
  setAddress: () => {},
  setMemo: () => {},
  setDeposit: () => {},
  setMonthlyPrice: () => {},
  setPrice: () => {},
  setMaintanenceFee: () => {},
  setDetailAddress: () => {},
  setArea: () => {},
  setFloor: () => {},
  setHouseType: () => {},
  setPriceType: () => {},
  setNickName: () => {},
};

const useCustomKokStore = create<CustomKokStore>((set) => ({
  ...initialState,
  setPicture: (picture) => set({ picture }),
  setAddress: (address) => set({ address }),
  setMemo: (memo) => set({ memo }),
  setDeposit: (deposit) => set({ deposit }),
  setMonthlyPrice: (monthlyPrice) => set({ monthlyPrice }),
  setPrice: (price) => set({ price }),
  setMaintanenceFee: (maintanenceFee) => set({ maintanenceFee }),
  setDetailAddress: (detailAddress) => set({ detailAddress }),
  setArea: (area) => set({ area }),
  setFloor: (floor) => set({ floor }),
  setHouseType: (houseType) => set({ houseType }),
  setPriceType: (priceType) => set({ priceType }),
  setNickName: (nickName) => set({ nickName }),
}));

export default useCustomKokStore;
