import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryInfo = ({country}) => {
  if(country.length===1){
    var cou = country[0]
    return(
      <div>
        <h1>{cou.name}</h1>
        <div>capital {cou.capital}</div>
        <div>population {cou.population}</div>
        <h2>languages</h2>
        <ul>
        {cou.languages.map((lang) =>
          <li key={lang.name}>{lang.name}</li>
        )}
        </ul>
        <img width='300px' alt='flag' src={cou.flag} />
      </div>

    )
  }
  return(<div></div>)
}

const App = (props) => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ filtered, setFiltered ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setFiltered(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handlefilterChange = (event) => {
    var countryList = []
    countries.forEach(country => {
      if(country.name.includes(event.target.value)){
        countryList.push(country)
      }
    })
    setFiltered(countryList)
    setFilter(event.target.value)
  }

  const handleClick = (country) => {
    setFiltered([country])
  }

  const listCountries = (c) => {
    if(c.length === 1){
      return(<div></div>)
    }
    return(
    c.map((country) => 
      <div key={country.name}>
        {country.name}
        <button onClick={() => handleClick(country)}>text</button>
      </div>
    ))}
  console.log(filtered)  
  return (
    <div>
      find countries <input 
                      value={filter}
                      onChange={handlefilterChange}
                     />
      <div>
        {filtered.length > 10 
        ? <div>Too many matches, specify another filter</div>
        : listCountries(filtered)
      }
      </div>
      <CountryInfo country={filtered} />
    </div>
  );
}

export default App;
