const Phonebook = ({ filter, handleFilter }) => {
  return (
    <>
      <label for='filter'>Filter shown with: </label>
      <input
        name='filter'
        value={filter}
        onChange={handleFilter}
      /> 
    </>
  );
};

export default Phonebook;