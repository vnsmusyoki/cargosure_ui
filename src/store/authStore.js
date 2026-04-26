import { create } from 'zustand';
import Cookies from 'js-cookie';

const COOKIE_OPTS = { expires: 7, sameSite: 'Strict' };

export const useAuthStore = create((set) => ({
  user: (() => {
    try { return JSON.parse(Cookies.get('user') || 'null'); } catch { return null; }
  })(),
  role: Cookies.get('role') || null,

  setUser: (user) => {
    Cookies.set('role', user.role, COOKIE_OPTS);
    Cookies.set('user', JSON.stringify(user), COOKIE_OPTS);
    set({ user, role: user.role });
  },

  clearUser: () => {
    Cookies.remove('role');
    Cookies.remove('user');
    set({ user: null, role: null });
  },
}));
