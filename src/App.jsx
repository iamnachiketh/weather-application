import React, { useState, useEffect } from 'react';
import { getCoordinates, getWeatherData } from './Api';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';

const App = () => {
  const [weather, setWeather] = useState({});
  const [background, setBackground] = useState(``);
  const [error, setError] = useState('');
  const [climate,setClimate] = useState('');

  const fetchWeather = async (city, ncountry) => {
    try {
      setError('');
      const { latitude, longitude,country} = await getCoordinates(city, ncountry);
      const weatherData = await getWeatherData(latitude, longitude);
      let fl = city[0].toUpperCase();
      let ncity = fl + city.slice(1);
      if (country) {
        fl = country[0].toUpperCase();
        var newcountry = fl + country.slice(1);
      }
      
      // I have Updated Background based on weather code.
      const weatherCode = weatherData.weathercode;
      if (weatherCode >= 0 && weatherCode <= 1) {
        if (!weatherData.is_day) setBackground('night.jpg');
        else setBackground(`sunny.jpg`);
        setClimate('Clear Sky');
      } else if (weatherCode >= 2 && weatherCode <= 3) {
        if (!weatherData.is_day) setBackground('night-cloudy.jpg');
        else setBackground(`cloudy.jpeg`);
        setClimate('Cloudy');
      } else if (
        (weatherCode >= 51 && weatherCode <= 67) ||
        weatherCode === 80 ||
        weatherCode === 81 ||
        (weatherCode >= 95 && weatherCode <= 99)
        ) {
          setBackground(`rainy.jpg`);
          setClimate('Rainy');
        } else if (
          (weatherCode >= 71 && weatherCode <= 77) ||
          weatherCode === 85 ||
          weatherCode === 86
          ) {
            if (!weatherData.is_day)
            // I have to buy premium for extra space for files so i have added the links!! 
            setBackground(
              'https://static.vecteezy.com/system/resources/previews/014/908/634/non_2x/landscape-of-snow-storm-winter-background-at-night-digital-art-design-free-photo.jpg'
              );
              else
              setBackground(
                'https://img.pikbest.com/wp/202344/snowy-snow-wonderland-a-natural-winter-background-with-white-texture_9898720.jpg!sw800'
                );
              setClimate('Snowy');
              }
        setWeather({ ncity, newcountry,climate, ...weatherData });
    } catch (err) {
      setError(
        'Unable to fetch weather. Please check the city or country name. ' +
          err.message
      );
    }
  };
  
  useEffect(() => {
    fetchWeather('Bengaluru', 'India');
  },[]);
  

  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <h1
        style={{
          fontSize: '40px',
          marginTop: '0px',
          color: `${
            weather?.is_day ||
            (weather?.weathercode >= 51 && weather?.weathercode <= 67) ||
            weather.weathercode === 80 ||
            weather?.weathercode === 81 ||
            (weather?.weathercode >= 95 && weather?.weathercode <= 99)
              ? `black`
              : `white`
          }`,
        }}
      >
        Weather Forecast Application
      </h1>
      <h4
        style={{
          marginTop: 0,
          fontWeight: 'bold',
          color: `${
            weather?.is_day ||
            (weather.weathercode >= 51 && weather.weathercode <= 67)
              ? `black`
              : `white`
          }`,
        }}
      >
        A simple application that displays a weather forecast
      </h4>
      <SearchBar fetchWeather={fetchWeather} />
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;
