import api from "../utils/api";

export const getAllMovie = async (params) => {
  const { data } = await api.get(`/movie`, { params });
  return data;
};

export const updateStatusMovie = async (id) => {
  const { data } = await api.patch(`/movie/status/${id}`);
  return data;
};