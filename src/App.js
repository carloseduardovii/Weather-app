import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {


  const [weather, setWeather] = useState({})
  const [isClick, setIsClick] = useState(true)

  const success = pos => {
    console.log(pos.coords)
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=12254ae306849c24368ef5867b7e8f2f`)
      .then(res => {
        setWeather(res.data)

      })
  }
  

    useEffect(() =>{
    navigator.geolocation.getCurrentPosition(success);
    },[])

    const convertKtoC = () => {
      return (weather.main?.temp - 273.15).toFixed(2)

    }
    const convertKtoF = () => {
      return((weather.main?.temp - 273.15) *9/5 + 32).toFixed(2)
    }
  

  return (
    <div className="App">
      <h1>Weather</h1>
      <hr />
      <div className='card'>
        <div className='weather-data'>
        
            <ul>
              <li><b>Country: </b>{weather.sys?.country}</li>
              <li><b>City: </b>{weather.main?.name}</li>
              <li><b>Wind Speed: </b>{weather.wind?.speed}</li>
              <li><b>Latitude: </b>{weather.coord?.lat}</li>
              <li><b>Longitude: </b>{weather.coord?.lon}</li>
              <li><b>Pressure: </b>{weather.main?.pressure}</li>
              <li><b>Temperature: </b>{isClick ? `${convertKtoF()} °F` : `${convertKtoC()} °C`}</li>
                {/* &nbsp; */}
              <button onClick={() => setIsClick(!isClick)}>{isClick ? "CONVERT TO °C" : "CONVERT TO °F"}</button>
              </ul>
          </div>
      </div>
        
    </div>
  );

}

export default App;
