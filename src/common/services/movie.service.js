
import api from "../utils/api";

export const getAllMovie = async (params) => {
  const { data } = await api.get(`/movie`, { params });
  return data;
};

export const updateStatusMovie = async (id) => {
  const { data } = await api.patch(`/movie/status/${id}`);
  return data;
};

export const createMovieAPI = async (payload)=>{
  const {data} = await api.post("/movie", payload);
  return data;
};

export const getDetailMovie = async (id)=>{
  const{data} = await api.get(`/movie/detail/${id}`);
  return data;
};
export const updateMovieAPI = async(id, payload)=>{
  const {data} = await api.patch(`/movie/update/${id}`,payload);
  return data;
}