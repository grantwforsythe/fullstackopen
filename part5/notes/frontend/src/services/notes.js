const baseUrl = '/api/notes';

const getAll = async () => {
  const response = await fetch(baseUrl);
  return response.json();
};

const create = async newObject => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: newObject.content,
      important: newObject.important,
    }),
  });

  return response.json();
};

const update = async (id, newObject) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      important: newObject.important,
    }),
  });

  return response.json();
};

const noteService = { getAll, create, update };

export default noteService;
