import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Gender } from 'pages/SignIn';
import type { HouseType } from 'types/HouseType';
import type { PriceType } from 'types/PriceType';
import type { UserInfo } from 'types/UserInfo';

type MyPageInfo = UserInfo & {
  setImageUrl: (imageUrl?: string) => void;
  setNickname: (nickname?: string) => void;
  setBirthday: (birthday?: string) => void;
  setGender: (birthday?: Gender) => void;
  setAddress: (string?: string) => void;
  setLongitude: (longitude?: number) => void;
  setLatitude: (latitude?: number) => void;
  setRealEstateType: (houseType?: HouseType) => void;
  setTransactionType: (priceType?: PriceType) => void;
  setMPriceMin: (mpriceMin?: number) => void;
  setMPriceMax: (mpriceMax?: number) => void;
  setMDepositMin: (mdepositMin?: number) => void;
  setMDepositMax: (mdepositMax?: number) => void;
  setYDepositMin: (ydepositMin?: number) => void;
  setYDepositMax: (ydepositMax?: number) => void;
  setPurchaseMin: (purchaseMin?: number) => void;
  setPurchaseMax: (purchaseMax?: number) => void;
  set: (newState: Partial<MyPageInfo>) => void;
};

const initialState: MyPageInfo = {
  imageUrl: null,
  nickname: '게스트',
  birthday: '040405',
  gender: 'DISCLOSURE',
  realEstateType: 'ONEROOM',
  transactionType: 'MONTHLY',
  address: '화양동',
  longitude: 127.041,
  latitude: 37.551,
  setImageUrl: () => {},
  setNickname: () => {},
  setBirthday: () => {},
  setGender: () => {},
  setAddress: () => {},
  setLongitude: () => {},
  setLatitude: () => {},
  setRealEstateType: () => {},
  setTransactionType: () => {},
  setMPriceMin: () => {},
  setMPriceMax: () => {},
  setMDepositMin: () => {},
  setMDepositMax: () => {},
  setYDepositMin: () => {},
  setYDepositMax: () => {},
  setPurchaseMin: () => {},
  setPurchaseMax: () => {},
  set: () => {},
};

const useMyPageStore = create(
  persist<MyPageInfo>(
    (set) => ({
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
      setPurchaseMin: (purchaseMin) => set({ purchaseMin }),
      setPurchaseMax: (purchaseMax) => set({ purchaseMax }),

      set: (newState) => set(newState),
    }),
    {
      name: 'myPageStore',
    },
  ),
);

export default useMyPageStore;
