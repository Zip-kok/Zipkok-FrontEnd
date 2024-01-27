import MenuPath from 'types/MenuPath';
import { create } from 'zustand';

interface OpenModalProps {
  title: string;
  primaryButton: string;
  secondaryButton?: string;
  description?: string;
}

type ModalResult = 'secondary' | 'primary' | 'close';

export interface ModalStore {
  enabled: boolean;
  title: string;
  description?: string;
  secondaryButton?: string;
  primaryButton: string;
  onSecondaryButtonClick?: () => void;
  onPrimaryButtonClick: () => void;
  open: (props: OpenModalProps) => Promise<ModalResult>;
  close: () => void;
}

const initialState: Omit<ModalStore, 'open'> = {
  enabled: false,
  title: '',
  primaryButton: '확인',
  onPrimaryButtonClick: () => {},
  close: () => {},
};

const useModalStore = create<ModalStore>((set) => ({
  ...initialState,

  open: ({
    title,
    primaryButton,
    secondaryButton,
    description,
  }: OpenModalProps) => {
    return new Promise<ModalResult>((resolve) => {
      set({
        enabled: true,
        title,
        primaryButton,
        secondaryButton,
        description,
        onPrimaryButtonClick: () => {
          set({ ...initialState });
          resolve('primary');
        },
        onSecondaryButtonClick: () => {
          set({ ...initialState });
          resolve('secondary');
        },
        close: () => {
          set({ ...initialState });
          resolve('close');
        },
      });
    });
  },
}));

export default useModalStore;
