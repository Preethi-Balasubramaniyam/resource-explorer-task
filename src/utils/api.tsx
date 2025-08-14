import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

// Define only the query params the API expects
type CharacterQueryParams = {
  page?: string;
  name?: string;
  status?: string;
};

// Function now accepts known params + optional signal
export const fetchCharacters = async (
  params: CharacterQueryParams & { signal?: AbortSignal }
) => {
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
