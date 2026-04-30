import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const clearAuthCookies = () => {
  Cookies.remove('user');
  Cookies.remove('role');
  Cookies.remove('employeeData');
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';

    // Session expired or no session — skip on login so wrong-password 401s don't redirect
    if (status === 401 && !requestUrl.includes('/Auth/login')) {
      clearAuthCookies();
      window.location.replace('/unauthenticated');
      return Promise.reject({ message: 'Session expired. Please log in again.' });
    }

    // Authenticated but not allowed to access this resource
    if (status === 403) {
      window.location.replace('/unauthorized');
      return Promise.reject({ message: 'You do not have permission to access this resource.' });
    }

    const data = error.response?.data;
    if (data?.errors) {
      return Promise.reject({ errors: data.errors, message: data.message });
    }
    if (data?.message) {
      return Promise.reject({ message: data.message });
    }
    return Promise.reject({ message: 'Network error. Please try again.' });
  }
);

export default api;
