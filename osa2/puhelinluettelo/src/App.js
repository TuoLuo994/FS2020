import React, { useState } from 'react'

const Filter = (props) => {
  const handleFilterChange = (event) => {
      var filteredList = []
      props.persons.forEach(p => {
          if(!p.name.includes(event.target.value)){
              filteredList.push(p.name)
          }
      })
      props.setFiltered(filteredList)
  }
  return(
      <div>
        filter: <input 
                value={props.filtered} 
                onChange={handleFilterChange} 
              />
      </div>)
}

const PersonForm = (props) => {
  return(
      <form onSubmit={props.addPerson}>
      <div>
      name: <input 
              value={props.newName} 
              onChange={props.handleNameChange} 
              />
      </div>
      <div>
      number: <input 
              value={props.newNmbr} 
              onChange={props.handleNmbrChange} 
      />
      </div>
      <div>
      <button type="submit">add</button>
      </div>
  </form>
  )}


const Person = (props) => {
  return (
      <li>{props.name} {props.nmbr}</li>
  )
}

const Persons = ({persons, filtered}) => {
  const filter = (filter, person) => {
    if(!filter.includes(person.name)){
      return(
        <Person 
          key = {person.name} 
          name = {person.name}
          nmbr = {person.nmbr}
        />
      )
    }
    return(false)
  }
  return(
      <ul>
        {persons.map((person) => 
          filter(filtered, person)
        )}
      </ul>
  )}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', nmbr: '040-123456' },
    { name: 'Ada Lovelace', nmbr: '39-44-5323523' },
    { name: 'Dan Abramov', nmbr: '12-43-234345' },
    { name: 'Mary Poppendieck', nmbr: '39-23-6423122' }
  ])
  const [ filtered, setFiltered ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNmbr, setNewNmbr ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    var exists = false
    const personObject = {
      name: newName,
      nmbr: newNmbr
    }
    persons.forEach(p => {
      if (newName === p.name){
        exists = true
      }})
    if(exists){
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNmbr('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNmbrChange = (event) => {
    setNewNmbr(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filtered} 
              persons={persons}
              setFiltered={setFiltered}/>
      <h2>add new contact</h2>
      <PersonForm addPerson={addPerson}
                  newName = {newName}
                  handleNameChange={handleNameChange}
                  newNmbr={newNmbr}
                  handleNmbrChange={handleNmbrChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filtered={filtered}/>
    </div>
  )

}

export default App