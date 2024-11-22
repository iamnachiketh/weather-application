import axios from 'axios';

// Get latitude and longitude for a city
export const getCoordinates = async (city,ncountry) => {

  const response = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=6`
    );
  
  if (response.data.results && response.data.results.length > 0) {
    let objLength = response.data.results.length;
    for(var i =0;i<objLength;i++){
        if(response.data.results[i].name === city && response.data.results[i].country === ncountry)
        {
            const { latitude, longitude,country} = response.data.results[i];
            if(city !== country){
              if(!city) throw new Error("Please Specify the city name")
              // else if(!ncountry) throw new Error("please Specify the country name");
              // console.log(!ncountry);
            } 
            return { latitude, longitude,country};
        }
    }
    const { latitude, longitude, country} = response.data.results[0];
    console.log(country);
    return { latitude, longitude, country};
  } else {
    // In Api instead of banglore bengaluru is present so we have to match for that!!
    if(city === "banglore" || city === "Banglore") throw new Error("City/Country not found, please type Bengaluru instead of bangalore");
    else throw new Error('City/Country not found.');
  }
};

// Fetch weather data using latitude and longitude
export const getWeatherData = async (latitude, longitude) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  return response.data.current_weather;
};
