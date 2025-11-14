import api from "../utils/api";

export const getAllGenre = async (params) => {
  const { data } = await api.get("/genre", { params });
  return data;
};
