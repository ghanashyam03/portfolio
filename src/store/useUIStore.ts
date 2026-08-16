import { create } from 'zustand';

interface UIState {
  hasLoaded: boolean;
  setHasLoaded: (loaded: boolean) => void;
  isNavOpen: boolean;
  setNavOpen: (open: boolean) => void;
  toggleNav: () => void;
  theme: 'dark';
}

export const useUIStore = create<UIState>((set) => ({
  hasLoaded: false,
  setHasLoaded: (loaded) => set({ hasLoaded: loaded }),
  isNavOpen: false,
  setNavOpen: (open) => set({ isNavOpen: open }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  theme: 'dark',
}));
