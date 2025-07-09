const express = require('express');
const axios = require('axios');
const Weather = require('../models/Weather');
const router = express.Router();

const OPENWEATHER_API_KEY = 'fbcb6cb3796b5db9afa1b8d58765b2bf'; // <-- User's actual API key

router.get('/', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const { name, main, weather } = response.data;
    const weatherData = {
      city: name,
      temperature: main.temp,
      description: weather[0].description,
    };

    // Save to MongoDB
    const weatherDoc = new Weather(weatherData);
    await weatherDoc.save();

    res.json({ ...weatherData, date: weatherDoc.date });
  } catch (err) {
    // Log the actual error from OpenWeatherMap or Axios
    if (err.response) {
      console.error('Weather API error:', err.response.data);
    } else {
      console.error('Weather API error:', err.message);
    }
    res.status(404).json({ error: 'City not found or API error' });
  }
});

module.exports = router; 