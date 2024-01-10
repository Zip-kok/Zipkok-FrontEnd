import { create } from 'zustand';
import NaviMenu from '../types/NaviMenu';

export interface NaviStore {
  naviMenu: NaviMenu;
  setNaviMenu: (naviMenu: NaviMenu) => void;
}

const initialState: NaviStore = {
  naviMenu: 'home',
  setNaviMenu: () => {},
};

const useNaviStore = create<NaviStore>((set) => ({
  ...initialState,

  setNaviMenu: (naviMenu: NaviMenu) => {
    set((state) => ({
      ...state,
      naviMenu,
    }));
  },
}));

export default useNaviStore;
