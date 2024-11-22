import React from 'react';
import './WeatherCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloudSun,
  faCloudRain,
  faCloudMoon,
  faSnowflake,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

const WeatherCard = ({ weather }) => {
  const iconRendering = () => {
    switch (weather.climate) {
      case 'Clear Sky':{
        if(weather.is_day) return <FontAwesomeIcon icon={faSun} />;
        else return (<FontAwesomeIcon icon={faMoon} />);
      }
      case 'Cloudy':{
        if(weather.is_day) return (<FontAwesomeIcon icon={faCloudSun} />);
        else return <FontAwesomeIcon icon={faCloudMoon} />;
      }
      case 'Rainy':
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 'Snowy':
        return <FontAwesomeIcon icon={faSnowflake} />;
    }
  };
  return (
    <div className="weather-card">
      <h1>
        {weather.ncity}
        {weather.newcountry !== weather.ncity ? ', ' + weather.newcountry : ''}
      </h1>
      <h2>
        {weather.temperature}°C  {iconRendering()}
      </h2>
      <p>Wind Speed: {weather.windspeed} km/h</p>
      <p>Wind Direction: {weather.winddirection}°</p>
      <p>Climate: {weather.climate}</p>
      <p>{weather.is_day ? 'Daytime' : 'Nightime'}</p>
    </div>
  );
};

export default WeatherCard;
