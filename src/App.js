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
      return (weather.main?.temp - 273.15).toFixed(1)

    }
    const convertKtoF = () => {
      return((weather.main?.temp - 273.15) *9/5 + 32).toFixed(1)
    }
  

  return (
    <div className="App">
      <h1>Weather</h1>
      
      
        <div className='container-temp'>
          <div className='temp'>
            <p><b> {isClick ? `${convertKtoF()} °F` : `${convertKtoC()} °C`}</b></p>
                {/* &nbsp; */}
            <button onClick={() => setIsClick(!isClick)}>{isClick ? "CONVERT TO °C" : "CONVERT TO °F"}
            </button>
          </div>
        </div>

        
        

        <div className='card'>
          <div className='weather-data'>
            
            <div className='cloud-icon'>
              <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            </div>

            <ul>
              <li><b>Country: </b>{weather.sys?.country}</li>
              <li><b>City: </b>{weather.main?.name}</li>
              <li><b>Wind Speed: </b>{weather.wind?.speed}</li>
              <li><b>Latitude: </b>{weather.coord?.lat}</li>
              <li><b>Longitude: </b>{weather.coord?.lon}</li>
              <li><b>Pressure: </b>{weather.main?.pressure}</li>
            </ul>
          </div>
        </div>
        <div className='footer-end'>
          <footer>
            <p><strong>© 2012 — 2021 OpenWeather ® All rights reserved</strong></p>
          </footer>
        </div>
    </div>
  );

}

export default App;
