import React, { useState, useEffect } from "react";

function WeatherCard({ city, temperature, description }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{city}</h5>
        <p className="card-text">Temperature: {temperature}°C</p>
        <p className="card-text">Description: {description}</p>
      </div>
    </div>
  );
}

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const fetchWeatherData = () => {
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Ob-havo ma'lumotlarini olishda xatolik yuz berdi:", error);
        setError("Shahar topilmadi");
        setWeatherData(null);
      });
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  return (
    <div className="container mx-auto">
      <h1 className="text-center mt-4 mb-5">Ob-havo ma'lumotlari</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      {weatherData && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <WeatherCard
              city={weatherData.city}
              temperature={weatherData.temperature}
              description={weatherData.description}
            />
          </div>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default App;
