import MenuPath from 'types/MenuPath';
import { create } from 'zustand';

interface OpenModalProps {
  title: string;
  primaryButton: string;
  secondaryButton?: string;
  description?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
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

const initialState: ModalStore = {
  enabled: false,
  title: '',
  primaryButton: '확인',
  onPrimaryButtonClick: () => {},
  open: () => Promise.resolve('primary'),
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
          resolve('primary');
        },
        onSecondaryButtonClick: () => {
          resolve('secondary');
        },
        close: () => {
          set(initialState);
          resolve('close');
        },
      });
    });
  },
}));

export default useModalStore;
