const baseUrl = '/api/notes';

const getAll = async () => {
  const response = await fetch(baseUrl);
  return await response.json();
};

const create = async (newObject) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: newObject.content,
      important: newObject.important,
    })
  });

  return await response.json();
};

const update = async (id, newObject) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      important: newObject.important,
    })
  });

  return await response.json();
};

const noteService = { getAll, create, update };

export default noteService;
