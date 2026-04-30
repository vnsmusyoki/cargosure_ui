import { create } from 'zustand';
import Cookies from 'js-cookie';
import { getMe } from '@/features/auth/authService';

const COOKIE_OPTS = { expires: 7, sameSite: 'Strict' };

const parseJson = (str) => {
  try { return JSON.parse(str || 'null'); } catch { return null; }
};

export const useAuthStore = create((set, get) => ({
  user: parseJson(Cookies.get('user')),
  role: Cookies.get('role') || null,
  employeeData: parseJson(Cookies.get('employeeData')),
  loading: false,
  hasFetchedUser: false,

  fetchUser: async () => {
    if (get().hasFetchedUser) return;

    // Cookies already hydrated the store on init — trust them and skip the network call.
    // If the server session has actually expired, the next real API call will 401 and
    // the response interceptor will redirect to /unauthenticated at that point.
    const existing = get().user;
    if (existing?.role) {
      set({ hasFetchedUser: true });
      return;
    }

    set({ loading: true });
    try {
      const data = await getMe();
      const user = data.user ?? data;
      const employeeData = data.employeeData ?? null;

      Cookies.set('user', JSON.stringify(user), COOKIE_OPTS);
      Cookies.set('role', user.role, COOKIE_OPTS);
      if (employeeData) Cookies.set('employeeData', JSON.stringify(employeeData), COOKIE_OPTS);

      set({ user, role: user.role, employeeData, loading: false, hasFetchedUser: true });
    } catch {
      Cookies.remove('user');
      Cookies.remove('role');
      Cookies.remove('employeeData');
      set({ user: null, role: null, employeeData: null, loading: false, hasFetchedUser: true });
    }
  },

  setUser: (user, employeeData = null) => {
    Cookies.set('role', user.role, COOKIE_OPTS);
    Cookies.set('user', JSON.stringify(user), COOKIE_OPTS);
    if (employeeData) Cookies.set('employeeData', JSON.stringify(employeeData), COOKIE_OPTS);
    set({ user, role: user.role, employeeData, hasFetchedUser: true });
  },

  clearUser: () => {
    Cookies.remove('role');
    Cookies.remove('user');
    Cookies.remove('employeeData');
    set({ user: null, role: null, employeeData: null, hasFetchedUser: false });
  },
}));
