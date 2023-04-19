import axios from 'axios';

const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newObject => {
  const params = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, params);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const noteService = { getAll, create, update, setToken };

export default noteService;
