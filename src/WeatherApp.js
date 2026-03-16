// WeatherApp.jsx
import React, { useState } from "react";
import axios from "axios";
import "./style.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [temperature, setTemperature] = useState("");
  const [forecast] = useState([]);
  const [emoji, setEmoji] = useState("");

  // Function to map condition to an emoji
  const getEmoji = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "☀️";
      case "cloudy":
        return "☁️";
      case "rain":
      case "rainy":
        return "🌧️";
      case "snow":
        return "❄️";
      case "storm":
      case "thunderstorm":
        return "⛈️";
      default:
        return "🌡️";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      // Replace this URL with your actual weather API
     const response = await axios.get(
  `https://api.shecodes.io/weather/v1/current?query=${city}&key=410o3ft86210d5f3d73f24a4d34d2bab&units=metric`
);
      const data = response.data;

setCondition(data.condition.description);
setHumidity(data.temperature.humidity);
setWind(data.wind.speed);
setTemperature(data.temperature.current);
setEmoji(getEmoji(data.condition.description));
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Could not fetch weather data. Check your API or city name.");
    }
  };

  return (
    <div className="weather-box">
      <header>
        <form className="form-search" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="city-form"
          />
          <input type="submit" value="Search" className="search-button" />
        </form>
      </header>

      <main>
        <div className="weather-app-info">
          <div>
            <h1 className="weather-city">{city}</h1>
            <p className="weather-data">
              Condition: <span>{condition}</span> <br />
              Humidity: <strong>{humidity}</strong>, Wind: <strong>{wind}</strong>
            </p>
          </div>
          <div className="weather-temp">
            <div id="weather-emojy">{emoji}</div>
            <div className="weather-number">{temperature}</div>
            <div className="weather-unit">°C</div>
          </div>
        </div>

        {forecast.length > 0 && (
          <div className="forecast-weather">
            <h3>Forecast:</h3>
            <ul>
              {forecast.map((day, index) => (
                <li key={index}>
                  {day.day}: {day.condition}, {day.temp}°C
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer>
        This project was coded by{" "}
        <a href="https://github.com/Lebohang2" target="_blank" rel="noreferrer">
          Lebohang Kubheka
        </a>
        , is{" "}
        <a
          href="https://github.com/Lebohang2/Weather-homework"
          target="_blank"
          rel="noreferrer"
        >
          open-sourced on Github
        </a>{" "}
        and{" "}
        <a
          href="https://app.netlify.com/teams/lebohang2/projects"
          target="_blank"
          rel="noreferrer"
        >
          hosted on Netlify.
        </a>
      </footer>
    </div>
  );
}