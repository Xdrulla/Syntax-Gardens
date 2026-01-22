import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InventoryItem } from '../types';

interface InventoryState {
  items: InventoryItem[];
  selectedSeedId: string | null;

  addItem: (itemType: InventoryItem['itemType'], itemId: string, quantity?: number) => void;
  removeItem: (itemId: string, quantity?: number) => boolean;
  selectSeed: (seedId: string | null) => void;
  getItemQuantity: (itemId: string) => number;
  hasItem: (itemId: string, quantity?: number) => boolean;
}

const initialItems: InventoryItem[] = [
  {
    id: 'inv-1',
    itemType: 'seed',
    itemId: 'var-seedling',
    quantity: 5,
  },
];

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: initialItems,
      selectedSeedId: null,

      addItem: (itemType, itemId, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.itemType === itemType && item.itemId === itemId
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === existingItem.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          const newItem: InventoryItem = {
            id: `inv-${Date.now()}`,
            itemType,
            itemId,
            quantity,
          };

          return { items: [...state.items, newItem] };
        }),

      removeItem: (itemId, quantity = 1) => {
        const state = get();
        const existingItem = state.items.find((item) => item.itemId === itemId);

        if (!existingItem || existingItem.quantity < quantity) {
          return false;
        }

        set((state) => {
          if (existingItem.quantity === quantity) {
            return {
              items: state.items.filter((item) => item.itemId !== itemId),
              selectedSeedId:
                state.selectedSeedId === itemId ? null : state.selectedSeedId,
            };
          }

          return {
            items: state.items.map((item) =>
              item.itemId === itemId
                ? { ...item, quantity: item.quantity - quantity }
                : item
            ),
          };
        });

        return true;
      },

      selectSeed: (seedId) => set({ selectedSeedId: seedId }),

      getItemQuantity: (itemId) => {
        const state = get();
        const item = state.items.find((i) => i.itemId === itemId);
        return item?.quantity ?? 0;
      },

      hasItem: (itemId, quantity = 1) => {
        const state = get();
        const item = state.items.find((i) => i.itemId === itemId);
        return item ? item.quantity >= quantity : false;
      },
    }),
    {
      name: 'syntax-gardens-inventory',
    }
  )
);
