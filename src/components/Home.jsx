import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1268dd43e1067c1569e46d9a387e2b00&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
      });
      setLocation("");
    }
  };

  function getSunrise() {
    if (data.sys) {
      return data.sys.sunrise;
    } else return 0;
  }
  const timestamp = getSunrise();
  const date = new Date(timestamp * 1000);
  const time24 = date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  function getSunset() {
    if (data.sys) {
      return data.sys.sunset;
    } else return 0;
  }
  const timestamp2 = getSunset();
  const date2 = new Date(timestamp2 * 1000);
  const time2 = date2.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="app">
      <div className="search">
        <input
          onKeyDown={searchLocation}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          value={location}
          type="text"
        />
      </div>
      {data.name ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>
                {data.name} {data.sys.country}
              </p>
              <div className="temp">
                <h1>
                  {Math.round(data.main.temp)}°<span className="cel">C</span>
                </h1>
                <div className="desc">
                  <h3>{data.weather[0].description}</h3>
                </div>
              </div>
            </div>
          </div>
          {data.sys.country === "MA" ? (
            <div className="set-rise">
              <div className="wind">
                <p className="bold m-0">{time24}</p>
                <p className="arabic-font">الشروق</p>
              </div>
              <div className="wind">
                <p className="bold m-0">{time2}</p>
                <p className="arabic-font">الغروب</p>
              </div>
            </div>
          ) : null}
          <div className="bottom">
            <div className="feels">
              <p className="bold">{Math.round(data.main.feels_like)}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed} mph</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
