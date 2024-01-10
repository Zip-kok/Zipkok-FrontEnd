import { create } from 'zustand';
import NaviMneu from '../types/NaviMenu';

export interface NaviStore {
  menu: NaviMneu;
}

const initialState: NaviStore = {
  menu: 'home',
};

const useNaviStore = create<NaviStore>((set) => ({
  ...initialState,

  setMenu: (menu: NaviMneu) =>
    set((state) => ({
      ...state,
      menu,
    })),
}));

export default useNaviStore;
