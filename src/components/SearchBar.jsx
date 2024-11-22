import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ fetchWeather }) => {
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    let place = location.split(/[,\s]+/);
    console.log(place);
    if(place.length === 3){
      fetchWeather(place[0]+" "+place[1],place[2]);
    }else fetchWeather(place[0],place[1]);
    setLocation('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city and country name..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
