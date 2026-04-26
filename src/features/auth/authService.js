import api from "@/services/api";

// LOGIN
export const login = async ({ email, password }) => {
    const payload = {
        UserName: email,
        Password: password,
    }
  const response = await api.post("/Auth/login", payload);

  return response.data;
};

// REGISTER (optional future use)
export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// LOGOUT
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};