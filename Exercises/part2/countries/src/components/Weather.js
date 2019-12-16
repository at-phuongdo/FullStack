import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({countryName}) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const eventHandler = response => {
      setWeather(response.data)
    }
    const promise = axios.get(` http://api.weatherstack.com/current?access_key=4a655cbb6270673873ccabf8dd258f49&query=${countryName}`)
    promise.then(eventHandler)
  }, [countryName])

  if (!weather.current) {
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <div>
        <h3>Weather in {weather.location.name}</h3>
        <p><strong>Temperature:</strong> {weather.current.temperature} celsius</p>
        <img src={weather.current.weather_icons[0]} alt='weather icon'></img>
        <p><strong>Wind:</strong> {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
      </div>
    )
  }
}

export default Weather
