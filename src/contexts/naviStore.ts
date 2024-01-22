import { create } from 'zustand';
import NaviMenu from 'types/NaviMenu';

export interface NaviStore {
  showNaviBar: boolean;
  setShowNaviBar: (showNaviBar: boolean) => void;
  naviMenu: NaviMenu;
  setNaviMenu: (naviMenu: NaviMenu) => void;
}

const initialState: NaviStore = {
  showNaviBar: true,
  setShowNaviBar: () => {},
  naviMenu: 'home',
  setNaviMenu: () => {},
};

const useNaviStore = create<NaviStore>((set) => ({
  ...initialState,

  setShowNaviBar: (showNaviBar: boolean) => {
    set((state) => ({
      ...state,
      showNaviBar,
    }));
  },

  setNaviMenu: (naviMenu: NaviMenu) => {
    set((state) => ({
      ...state,
      naviMenu,
    }));
  },
}));

export default useNaviStore;
