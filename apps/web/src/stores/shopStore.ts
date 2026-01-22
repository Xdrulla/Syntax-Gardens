import { create } from 'zustand';

interface ShopState {
  isOpen: boolean;
  openShop: () => void;
  closeShop: () => void;
  toggleShop: () => void;
}

export const useShopStore = create<ShopState>()((set) => ({
  isOpen: false,
  openShop: () => set({ isOpen: true }),
  closeShop: () => set({ isOpen: false }),
  toggleShop: () => set((state) => ({ isOpen: !state.isOpen })),
}));
