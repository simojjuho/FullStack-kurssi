const AddNumber = ({handleNameFieldChange,
                    handleNumberFieldChange,
                    addContact, 
                    newName, 
                    newNumber}) => {
    return (
    <form onSubmit={addContact}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameFieldChange} 
                /><br />
          number: <input
                  value={newNumber}
                  onChange={handleNumberFieldChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      )
}

export default AddNumber