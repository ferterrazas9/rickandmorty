import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import CardResident from './components/CardResident'
import FilterList from './components/FilterList'
import ErrorScreen from './components/ErrorScreen'




function App() {
  const [location, setLocation] = useState()
  const [SearchLoc, setSearchLoc] = useState('')
  const [suggestedList, setSuggestedList] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()
    if (SearchLoc) {
      id = SearchLoc
    }
    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false), setLocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [SearchLoc])

  const handleSubmit = e => {
    e.preventDefault()
    setSearchLoc(e.target.idLocation.value)
  }

  const handleChange = e => {

    if (e.target.value === '') {
      setSuggestedList()
    } else {
      const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}`

      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => console.log(err))
    }
  }


  return (
    <div className="App">
      <div className='title__principal'>
        <h1>Rick And Morty</h1>
        <form className='form__title' onSubmit={handleSubmit}>
          <input className='form__input' type="text" id='idLocation' placeholder='Enter another number from 1 to 126' onChange={handleChange} />
          <button className='form__btn'>Search</button>
          <FilterList suggestedList={suggestedList} setSearchLoc={setSearchLoc} />
        </form>
      </div>
      {
        hasError ?
          <ErrorScreen />

          :
          <>
            <LocationInfo location={location} />
            <div className='card__container'>
              {
                location?.residents.map(url => (
                  <CardResident key={url} url={url} />
                ))
              }
            </div>
          </>
      }

    </div>
  )
}

export default App
