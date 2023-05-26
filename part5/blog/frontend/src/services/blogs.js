import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  const data = await request.data;
  return data;
};

export default { getAll };
