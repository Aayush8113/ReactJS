import axiosClient from "./axiosClient";

const endpoint = "/tasks";

export const taskService = {
  getAll: () => axiosClient.get(endpoint),
  add: (data) => axiosClient.post(endpoint, data),
  update: (id, data) => axiosClient.put(`${endpoint}/${id}`, data),
  remove: (id) => axiosClient.delete(`${endpoint}/${id}`),
};
