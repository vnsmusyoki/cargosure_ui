import api from '@/services/api';

export const getMyMenus = async () => {
  const { data } = await api.get('/Menu/my-menus');
  return data;
};

export const getAllMenus = async () => {
  const { data } = await api.get('/Menu/all');
  return data;
};

export const getMenusForRole = async (roleName) => {
  const { data } = await api.get(`/Menu/role/${roleName}`);
  return data;
};

export const getUserMenuAccess = async (userId) => {
  const { data } = await api.get(`/Menu/user-access/${userId}`);
  return data;
};

export const assignUserMenus = async ({ userId, roleId, menuIds }) => {
  const { data } = await api.post('/Menu/assign-user', { userId, roleId, menuIds });
  return data;
};

export const getOrgMenuAccess = async () => {
  const { data } = await api.get('/Menu/org-access');
  return data;
};

export const assignOrgMenus = async ({ organizationId, menuIds }) => {
  const { data } = await api.post('/Menu/assign-org', { organizationId, menuIds });
  return data;
};
