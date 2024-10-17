import axios from "../setup/axios";

const fetchPermissionsWithPaginate = async (page, limit) => {
  return await axios.get(
    `/api/v1/permissions/read?page=${page}&limit=${limit}`
  );
};

const fetchAllPermissions = async () => {
  return await axios.get(`/api/v1/permissions/read`);
};
const deletePermission = async (userId) => {
  return await axios.delete(`/api/v1/permissions/delete/${userId}`);
};

const createNewPermission = async (permissions) => {
  return await axios.post(`/api/v1/permissions/create`, [...permissions]);
};

const updatePermission = async (id, userData) => {
  return await axios.put(`/api/v1/permissions/update/${id}`, {
    ...userData,
  });
};

const fetchPermissionByRole = async (roleId) => {
  return await axios.get(`/api/v1/roles/${roleId}/permissions`);
};

const assignPermissionsToRole = async (data) => {
  return axios.post(`/api/v1/permissions/assign-to-role`, { data });
};

export {
  createNewPermission,
  updatePermission,
  deletePermission,
  fetchAllPermissions,
  fetchPermissionsWithPaginate,
  fetchPermissionByRole,
  assignPermissionsToRole,
};
