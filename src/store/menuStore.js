import { create } from 'zustand';
import { getMyMenus } from '@/services/menuService';

export const useMenuStore = create((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  hasFetched: false,

  fetchMenus: async () => {
    if (get().hasFetched) return;

    set({ loading: true, error: null });
    try {
      const data = await getMyMenus();
      // API returns { categories: [...] }
      set({ categories: data.categories ?? [], loading: false, hasFetched: true });
    } catch (err) {
      set({ error: err?.message ?? 'Failed to load menus', loading: false, hasFetched: true });
    }
  },

  clearMenus: () => set({ categories: [], loading: false, error: null, hasFetched: false }),

  // Force a refresh (e.g. after an assignment change)
  refreshMenus: async () => {
    set({ hasFetched: false });
    await get().fetchMenus();
  },
}));
