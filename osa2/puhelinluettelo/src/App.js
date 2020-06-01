import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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
              value={props.newNumber} 
              onChange={props.handlenumberChange} 
      />
      </div>
      <div>
      <button type="submit">add</button>
      </div>
  </form>
  )}


const Person = ({name, number, removePerson}) => {
  return (
      <div>
        {name} {number} <button onClick={removePerson}>
            delete
          </button>
      </div>
  )
}

const Persons = ({persons, filtered, removePerson}) => {

  const filter = (person) => {
    if(!filtered.includes(person.name)){
      return(
        <div key = {person.id} >
          <Person 
            name = {person.name}
            number = {person.number}
            removePerson = {() => removePerson(person)}
          />
        </div>
      )
    }
    return(false)
  }
  return(
      <ul>
        {persons.map((person, i) => 
          filter(person, i)
        )}
      </ul>
  )}

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [alertMessage, setalertMessage] = useState(null)
  const [errorMessage, seterrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  const addPerson = (event) => {
    event.preventDefault()
    var exists = false
    const personObject = {
      name: newName,
      number: newNumber
    }
    persons.forEach(p =>{
      if(newName === p.name){
        exists = true
        if (window.confirm(`${p.name} already exists. replace number?`)) {   
          personService
            .update(p.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              seterrorMessage(
                `information of ${p.name} has already been removed from server`
              )
              setTimeout(() => {
                seterrorMessage(null)
              }, 5000)
            })
        }
      }
    })

      
    if(!exists){
      setPersons(persons.concat(personObject))
      personService
        .create(personObject)
          .then(returnedPerson => {
            setalertMessage(
              `Added ${returnedPerson.name}`
            )
            setTimeout(() => {
              setalertMessage(null)
            }, 5000)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) { 
      personService
        .remove(person.id)
        .then(removedPerson => {
          setPersons(persons.filter(p => {
            return(p.id !== person.id)
          }))
        })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlenumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} type='alert' />
      <Notification message={errorMessage} type='error'  />
      <Filter value={filtered} 
              persons={persons}
              setFiltered={setFiltered}/>
      <h2>add new contact</h2>
      <PersonForm addPerson={addPerson}
                  newName = {newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handlenumberChange={handlenumberChange} 
                  />
      <h2>Numbers</h2>
      <Persons persons={persons} 
               filtered={filtered}
               removePerson = {removePerson}
      />
    </div>
  )

}

export default App