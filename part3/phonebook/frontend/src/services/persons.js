const baseUrl = '/api/persons';

const getAll = async () => {
  const response = await fetch(baseUrl);
  return await response.json();
};

const create = async (newPerson) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newPerson.content,
      number: newPerson.important,
    })
  });

  return await response.json();
};

const update = async (id, newPerson) => {
    const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      number: newPerson.number,
    })
  });

  return await response.json();
};

const deletePerson = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

const personServices = { getAll, create, update, deletePerson };

export default personServices;
