import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = (props) => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ weather, setWeather ] = useState([])
  const [ query, setQuery ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('country promise fulfilled')
        setCountries(response.data)
        setFiltered(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  const access_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${query}`)
      .then(response => {
        console.log('weather promise fulfilled')
        setWeather(response.data)
      })
  }, [access_key, query])

  const handlefilterChange = (event) => {
    var countryList = []
    countries.forEach(country => {
      if(country.name.includes(event.target.value)){
        countryList.push(country)
      }
    })
    if (countryList.length > 0){
      setQuery(countryList[0].name)
    }
    setFiltered(countryList)
    setFilter(event.target.value)
  }

  const handleClick = (country) => {
    setFiltered([country])
    setQuery(country.name)
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
        <div>
          {filtered.length === 1 && filtered.length > 0
          ? 
          <div>
            <h1>{filtered[0].name}</h1>
            <div>capital {filtered[0].capital}</div>
            <div>population {filtered[0].population}</div>
            <h2>Languages</h2>
            <ul>
            {filtered[0].languages.map((lang) =>
              <li key={lang.name}>{lang.name}</li>
            )}
            </ul>
            <img width='300px' alt='flag' src={filtered[0].flag} />
            <h2>Weather in {weather.location.name}</h2>
            <div>
              <b>temperature: {weather.current.temperature}</b>
            </div>
          </div>
          : <div></div>
        }
        </div>
    </div>
  );
}

export default App;
