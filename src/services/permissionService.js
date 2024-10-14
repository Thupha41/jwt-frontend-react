import axios from "../setup/axios";

const fetchAllPermissions = async (page, limit) => {
  return await axios.get(
    `/api/v1/permissions/read?page=${page}&limit=${limit}`
  );
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

export {
  createNewPermission,
  updatePermission,
  deletePermission,
  fetchAllPermissions,
};
