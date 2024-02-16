import defaultUserIcon from 'assets/img/common/user.png';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  imageUrl: defaultUserIcon,
  nickname: '게스트',
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

const useMyPageStore = create(
  persist(
    (set) => ({
      ...initialState,
      setImageUrl: (imageUrl: string) => set({ imageUrl }),
      setNickname: (nickname: string) => set({ nickname }),
      setBirthday: (birthday: string) => set({ birthday }),
      setGender: (gender: Gender) => set({ gender }),
      setAddress: (address: Address) => set({ address }),
      setRealEstateType: (realEstateType: HouseType) => set({ realEstateType }),
      setTransactionType: (transactionType: PriceType) =>
        set({ transactionType }),

      setMPriceMin: (mpriceMin: number) => set({ mpriceMin }),
      setMPriceMax: (mpriceMax: number) => set({ mpriceMax }),
      setMDepositMin: (mdepositMin: number) => set({ mdepositMin }),
      setMDepositMax: (mdepositMax: number) => set({ mdepositMax }),
      setYDepositMin: (ydepositMin: number) => set({ ydepositMin }),
      setYDepositMax: (ydepositMax: number) => set({ ydepositMax }),

      setPriceMin: (priceMin: number) => set({ priceMin }),
      setPriceMax: (priceMax: number) => set({ priceMax }),
    }),
    {
      name: 'myPageStore',
    },
  ),
);

export default useMyPageStore;
