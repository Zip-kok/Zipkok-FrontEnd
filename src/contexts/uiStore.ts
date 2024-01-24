import MenuPath from 'types/MenuPath';
import { create } from 'zustand';

export interface UIStore {
  naviEnabled: boolean;
  headerEnabled: boolean;
  headerIcon?: string;
  headerTitle: string;
  headerBackButtonEnabled: boolean;
  headerRightButtons: JSX.Element[];
  path: MenuPath;
  setUI: (
    partial:
      | UIStore
      | Partial<UIStore>
      | ((state: UIStore) => UIStore | Partial<UIStore>),
    replace?: boolean | undefined,
  ) => void;
}

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
  setUI: set,
}));

export default useUIStore;
