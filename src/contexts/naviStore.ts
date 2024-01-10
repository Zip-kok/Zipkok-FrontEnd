import { create } from 'zustand';
import NaviMneu from '../types/NaviMenu';

export interface NaviStore {
  naviMenu: NaviMneu;
  setNaviMenu: (naviMenu: NaviMneu) => void;
}

const initialState: NaviStore = {
  naviMenu: 'home',
  setNaviMenu: () => {},
};

const useNaviStore = create<NaviStore>((set) => ({
  ...initialState,

  setNaviMenu: (naviMenu: NaviMneu) =>
    set((state) => ({
      ...state,
      naviMenu,
    })),
}));

export default useNaviStore;
