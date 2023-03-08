import Person from './Person';

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <>
      <ul class='numbers'>
        {persons
          // Case-insensitive match by filter
          .filter(person => {
            return person.name.toLowerCase().includes(filter.toLowerCase());
          })
          .map(person => {
            return <Person
              key={person.id}
              person={person}
              handleDelete={handleDelete}
            />;
          })
        }
      </ul>
    </>
  );
};

export default Persons;