import React, { useState } from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherResult from './components/WeatherResult';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    setError('');
    setWeather(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeather(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching weather');
    }
  };

  return (
    <div>
      <WeatherForm onSearch={handleSearch} />
      <WeatherResult weather={weather} error={error} />
    </div>
  );
}

export default App;
