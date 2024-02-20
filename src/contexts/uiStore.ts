import MenuPath from 'types/MenuPath';
import { create } from 'zustand';

export interface Button {
  id: string;
  img: string;
  onPress: () => void;
}

interface UI {
  naviEnabled: boolean;
  headerEnabled: boolean;
  headerIcon?: string;
  headerTitle: string;
  headerBackButtonEnabled: boolean;
  headerRightButtons: Button[];
  backCallback?: () => void;
  path: MenuPath;
}

export type UIStore = UI & {
  setUI: (ui: UI) => void;
};

const initialState: UIStore = {
  naviEnabled: true,
  headerEnabled: true,
  headerTitle: '',
  headerBackButtonEnabled: false,
  headerRightButtons: [],
  path: 'home',
  setUI: () => {},
};

const useUIStore = create<UIStore>((set) => ({
  ...initialState,
  setUI: (ui: UI) =>
    set({
      ...ui,
      headerIcon: ui.headerIcon || initialState.headerIcon,
      backCallback: ui.backCallback || undefined,
    }),
}));

export default useUIStore;
