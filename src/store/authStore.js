import create from 'zustand';
import Cookies from 'js-cookie';

export const useAuthStore = create((set) => ({
  user: null,
  role: Cookies.get('role') || null,
  setUser: (user) => set(() => {
    Cookies.set('role', user.role, { expires: 7 });
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
    return { user, role: user.role };
  }),
  logout: () => set(() => {
    Cookies.remove('role');
    Cookies.remove('user');
    return { user: null, role: null };
  }),
  hydrate: () => {
    const user = Cookies.get('user');
    const role = Cookies.get('role');
    if (user && role) {
      set({ user: JSON.parse(user), role });
    }
  }
}));
