'use client'

import React, { useState, useEffect, ChangeEvent } from 'react';

interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  '1'?: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const WeatherForecast: React.FunctionComponent = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'dd1dbc504cbc5794452a0bbf8597606a';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
          const result: WeatherData = await response.json();
          console.log(result);
          setWeatherData(result);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="bg-gradient-to-r from-violet-100 to-indigo-100 flex sm:items-start lg:items-center justify-center h-screen ">
      <div className="w-11/12 sm:w-11/12 md:w-8/12 lg:w-6/12 backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm border-violet-200 border mt-[1.5rem]">
        <div className="w-full flex justify-between items-center p-3">
          <h2 className="text-xl font-semibold">Weather</h2>
        </div>
        <div className="w-full flex justify-center p-1 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              onChange={handleCityChange}
              value={city}
              className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-black "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <button className='w-full' onClick={(e) => {setModal(!modal)}}>
            <div className="flex w-full">
                <div className="w-full backdrop-blur-sm text-left bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                    <h2 className="text-xl font-semibold mb-4">{`Weather in ${city}`}</h2>
                    <p className="text-gray-700">Data from OpenWeatherMap.</p>
                    <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                    {weatherData ? (
                        <div>
                        <p>Temperature: {Math.round(weatherData.main.temp - 273.15)} C</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    </div>
                </div>
            </div>
        </button>    
      </div>
    
    { modal ? (
        <div id="myModal" className="fixed inset-0 z-10 overflow-hidden backdrop-blur-lg  flex items-center justify-center transition-transform duration-300">
        <div className="modal-container p-6 backdrop-blur-sm bg-white/90 w-11/12 sm:w-11/12 md:w-8/12 lg:w-6/12 rounded-md shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">{city}</h2>
            {weatherData ? (
                <div>
                <p>Temperature: {Math.round(weatherData.main.temp - 273.15)} C</p>
                <p>Weather: {weatherData.weather[0].description}</p>
                <p>Pressure: {weatherData.main.pressure}</p>
                <p>Wind: {weatherData.wind.speed}</p>

                </div>
            ) : (
                <p>Loading...</p>
            )}

            <div className="flex justify-end">
                <button 
                    className="bg-gradient-to-r from-gray-100 to-slate-200  border border-fuchsia-00 hover:border-violet-400  text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-400" 
                    onClick={(e) => {setModal(!modal)}}>Cancel</button>
            </div>
        </div>
    </div>
    ) : (
        null
    )}
    </div>
  );
};

export default WeatherForecast;
