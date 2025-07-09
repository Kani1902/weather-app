import React from 'react';

export default function WeatherResult({ weather, error }) {
  if (error) return <div>{error}</div>;
  if (!weather) return null;
  return (
    <div>
      <h2>{weather.city}</h2>
      <p>{weather.temperature}°C</p>
      <p>{weather.description}</p>
      <p>{new Date(weather.date).toLocaleString()}</p>
    </div>
  );
} 