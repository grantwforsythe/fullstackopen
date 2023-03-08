const PersonForm = ({
  newName,
  handleNewName,
  newPhone,
  handleNewPhone,
  addPerson
}) => {
  return (
    <>
      <form>
        <div>
          <label for='name'>Name: </label>
          <input
            type='text'
            name='name'
            placeholder='John Smith'
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <label for='phone'>Number: </label>
          <input
            type='tel'
            title='Please enter a phone number in the correct format'
            placeholder='(012) 345-6789'
            value={newPhone}
            onChange={handleNewPhone}
          />
        </div>
        <div>
          <button
            type='submit'
            onClick={addPerson}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;