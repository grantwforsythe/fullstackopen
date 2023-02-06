import Person from './Person';

const Persons = ({ persons, filter }) => {
  return (
    <>
      <ul class='numbers'>
        {persons
          .filter(person => {
            return person.name.toLowerCase().includes(filter.toLowerCase());
          })
          .map(person => {
            return <Person
              key={person.id}
              name={person.name}
              number={person.number}
            />;
          })
        }
      </ul>
    </>
  );
};

export default Persons;