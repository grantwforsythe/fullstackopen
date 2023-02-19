import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const fetchData = (request) => {
  return request.then(response => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return fetchData(request);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return fetchData(request);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return fetchData(request);
};

const noteService = { getAll, create, update };

export default noteService;
