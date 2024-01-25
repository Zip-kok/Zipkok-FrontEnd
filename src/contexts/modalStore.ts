import MenuPath from 'types/MenuPath';
import { create } from 'zustand';

export interface ModalStore {
  enabled: boolean;
  title: string;
  description?: string;
  secondaryButton?: string;
  primaryButton: string;
  onSecondaryButtonClick?: () => void;
  onPrimaryButtonClick: () => void;
  setModal: (
    partial:
      | ModalStore
      | Partial<ModalStore>
      | ((state: ModalStore) => ModalStore | Partial<ModalStore>),
    replace?: boolean | undefined,
  ) => void;
}

const initialState: ModalStore = {
  enabled: false,
  title: '',
  primaryButton: '확인',
  onPrimaryButtonClick: () => {},
  setModal: () => {},
};

const useModalStore = create<ModalStore>((set) => ({
  ...initialState,
  setModal: set,
}));

export default useModalStore;
