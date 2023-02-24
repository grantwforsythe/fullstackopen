const Person = ({ person, handleDelete }) => {
  const { id, name, number } = person;

  return (
    <>
      <li>
        {name} {number}
        <button onClick={() => handleDelete(id, name)}>delete</button>
      </li>
    </>
  );
};

export default Person;