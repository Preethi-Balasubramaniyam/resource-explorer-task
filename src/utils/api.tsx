import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (params: Record<string, any>) => {
  const { signal, ...rest } = params;
  const res = await axios.get(`${API_URL}/character`, {
    params: rest,
    signal,
  });
  return res.data;
};

export const fetchCharacterById = async (id: string) => {
  const res = await axios.get(`${API_URL}/character/${id}`);
  return res.data;
};