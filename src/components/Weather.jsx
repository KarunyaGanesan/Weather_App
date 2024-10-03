import './Weather.css'
import search_icon from '../assets/images/search.png'
import humid from '../assets/images/humid.png'
import wind from "../assets/images/wind.png"
import weather from '..//assets/images/weather.png'
import axios from 'axios'
import { useState } from 'react'



function Weather() {


    const [city, setcity] = useState("")
    const [cityname, setcityname] = useState('')
    const [humidity, sethumidity] = useState('0')
    const [windspeed, setwindspeed] = useState('0')
    const [temp, settemp] = useState('0')
    const [icon, seticon] = useState(weather)
    const [error, setError] = useState('')





    function handlecity(event) {
        const inputvalue = event.target.value
        setcity(inputvalue)
        setError('');


        if (inputvalue === "") {
            setcityname('');      
            sethumidity('0');    
            setwindspeed('0');  
            settemp('0');         
            seticon(weather);    
        }

    }
    function getweather() {
        const weather = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fc99267f3b744afb21d0ee88a2557f25`)
        weather.then(function (success) {
            console.log(success.data)
            setcityname(success.data.name)
            sethumidity(success.data.main.humidity)
            setwindspeed(success.data.wind.speed)
            var temperature = Math.floor(success.data.main.temp)
            settemp(temperature)
            seticon(`https://openweathermap.org/img/wn/${success.data.weather[0].icon}@2x.png`)
            setError('')


        })
        .catch(function (error) {
            console.error(error);
            setError('City not found. Please enter a valid city.'); 
           
        });
       

    }




    return (
        <div className='weather'>
            <div className='search-bar'>
                <input type="text" placeholder='Search any city name' onChange={handlecity} />
                <img src={search_icon} alt="search" onClick={getweather} />
            </div>
            {error && <p className='error-message' style={{color:'red', fontSize:'15px', fontWeight:'bold'}}>{error}</p>}
            <img src={icon} className='weather_icon'  alt='weather_icon'/>
            <p className='temperature'>{temp}°c</p>
            <p className='location'>{cityname}</p>

            <div className='weather-data'>

                <div className='col'>
                    <img src={humid} alt="humidity" className='humidity_icon' />
                    <div>
                        <p>{humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className='col'>
                    <img src={wind} alt="Wind" className='wind_icon' />
                    <div>
                        <p>{windspeed}km/h</p>
                        <span>Wind speed</span>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Weather