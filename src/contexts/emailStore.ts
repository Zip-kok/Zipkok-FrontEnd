import { create } from 'zustand';

export interface EmailStore {
  email: string;
  setEmail: (email: string) => void;
}

const initialState: EmailStore = {
  email: '',
  setEmail: () => {},
};

const useEmailStore = create<EmailStore>((set) => ({
  ...initialState,

  setEmail: (email: string) => {
    set((state) => ({
      ...state,
      email,
    }));
  },
}));

export default useEmailStore;
