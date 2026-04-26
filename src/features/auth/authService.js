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

// COMPANY REGISTRATION
export const registerCompany = async (payload) => {
  const response = await api.post("/Auth/register/company", payload);
  return response.data;
};

// DISTRIBUTOR REGISTRATION
export const registerDistributor = async (payload) => {
  const response = await api.post("/Auth/register/distributor", payload);
  return response.data;
};

// LOGOUT
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};