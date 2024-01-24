import NaviMenu from 'types/NaviMenu';
import { create } from 'zustand';

export interface UIStore {
  showNaviBar: boolean;
  setShowNaviBar: (showNaviBar: boolean) => void;
  showHeader: boolean;
  setShowHeader: (showTopBar: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  backBtnEnabled: boolean;
  setBackBtnEnabled: (backBtnEnabled: boolean) => void;
  headerButtons: JSX.Element[];
  setHeaderButtons: (topBarButtons: JSX.Element[]) => void;
  naviMenu: NaviMenu;
  setNaviMenu: (naviMenu: NaviMenu) => void;
}

const initialState: UIStore = {
  showNaviBar: true,
  setShowNaviBar: () => {},
  showHeader: true,
  setShowHeader: () => {},
  title: '',
  setTitle: () => {},
  backBtnEnabled: false,
  setBackBtnEnabled: () => {},
  headerButtons: [],
  setHeaderButtons: () => {},
  naviMenu: 'home',
  setNaviMenu: () => {},
};

const useUIStore = create<UIStore>((set) => ({
  ...initialState,

  setShowNaviBar: (showNaviBar: boolean) => {
    set((state) => ({
      ...state,
      showNaviBar,
    }));
  },

  setShowHeader: (showTopBar: boolean) => {
    set((state) => ({
      ...state,
      showHeader: showTopBar,
    }));
  },

  setTitle: (title: string) => {
    set((state) => ({
      ...state,
      title,
    }));
  },

  setBackBtnEnabled: (backBtnEnabled: boolean) => {
    set((state) => ({
      ...state,
      backBtnEnabled,
    }));
  },

  setHeaderButtons: (topBarButtons: JSX.Element[]) => {
    set((state) => ({
      ...state,
      headerButtons: topBarButtons,
    }));
  },

  setNaviMenu: (naviMenu: NaviMenu) => {
    set((state) => ({
      ...state,
      naviMenu,
    }));
  },
}));

export default useUIStore;
