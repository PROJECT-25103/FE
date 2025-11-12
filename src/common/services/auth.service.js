import api from "../utils/api";

export const registerService = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};