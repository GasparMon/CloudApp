import { useSelector } from "react-redux";
import "../css/Weather.modules.css";
import { useEffect, useState } from "react";
import AppGetWeather from "../handler/AppGetWeather";
import DayForecast from "./DayForecast";
import AppForecast from "../handler/AppForecast";
import HourForecast from "./HourForecast";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function Weather() {
  const navigate = useNavigate();
  const cityData = useSelector((state) => state.cityData);
  const [currentData, setCurrentData] = useState({});
  const [timestamp, setTimestamp] = useState({
    sunrise: null,
    sunset: null,
  });
  const [dayForecast, setDayForecast] = useState({});
  const [hourForecast, setHourForecast] = useState({});
  const [day, setDay] = useState("");

  if(Object.keys(cityData.coord).length === 0){
    navigate("/")
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await AppGetWeather(cityData.coord);

        if (response.name) {
          setCurrentData(response);
          setTimestamp({
            sunrise: response.sys.sunrise,
            sunset: response.sys.sunset,
          });
        }
      } catch (error) {
        return error.message;
      }
    };

    const fetchForecast = async () => {
      try {
        const response = await AppForecast(cityData.coord);

        setDayForecast(response);
      } catch (error) {
        return error.message;
      }
    };

    fetchData();
    fetchForecast();

  }, [cityData.name]);

  useEffect(() => {
    if (currentData.sys && currentData.sys.sunrise && currentData.sys.sunset) {
      const timezoneOffsetSeconds = currentData.timezone;

      const formatTime = (timestamp) => {
        const date = new Date((timestamp + timezoneOffsetSeconds) * 1000);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return `${hours}:${minutes}`;
      };

      const formattedSunrise = formatTime(currentData.sys.sunrise);
      const formattedSunset = formatTime(currentData.sys.sunset);

      setTimestamp({
        sunrise: formattedSunrise,
        sunset: formattedSunset,
      });
    }
  }, [currentData]);

  useEffect(() => {
    if (Object.keys(dayForecast).length) {
      const values = Object.entries(dayForecast);

      if (cityData.date === null) {
        setHourForecast(values[0]);

        const nwdate = parseISO(values[0][0]);
        const date_card = format(nwdate, "EEE, MMM dd");
        setDay(date_card);
      } else {
        const findDay = Object.entries(dayForecast).find(
          ([element]) => element === cityData.date
        );

        if (findDay) {
          const resultado = findDay;
          console.log("Resultado:", resultado);
          setHourForecast([resultado[0], resultado[1]]);
          const nwdate = parseISO(cityData.date);
          const date_card = format(nwdate, "EEE, MMM dd");
          setDay(date_card);
        }
      }
    }
  }, [cityData, dayForecast]);

  return (
    <>
      {currentData &&
        Object.keys(currentData).length > 0 &&
        Object.keys(hourForecast).length > 0 && (
          <div className="weather_main_container">
            <div className="weather_main_title">
              <span class="material-symbols-outlined">near_me</span>
              <h1 style={{ color: "#ffd901" }}>{cityData.name}</h1>
              <h1>Forecast</h1>
            </div>
            <div className="weather_data">
              <div className="weather_data_selection">
                <div className="weather_current_data">
                  <div className="weather_current_icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@4x.png`}
                    ></img>
                    <h3>{currentData.weather[0].main}</h3>
                    <h4>{currentData.weather[0].description}</h4>
                  </div>
                  <div className="weather_current_temp">
                    <h1>{Math.floor(currentData.main.temp)}°C</h1>
                    <h4>
                      Feels like {Math.floor(currentData.main.feels_like)}°C
                    </h4>
                  </div>
                  <div className="weather_info_temp">
                    <img
                      src="/img/max_tp.png"
                      alt="max_temp"
                      className="temp_icon"
                    ></img>
                    <h4>{Math.floor(currentData.main.temp_max)}°C</h4>
                    <img
                      src="/img/min_tp.png"
                      alt="min_temp"
                      className="temp_icon"
                    ></img>
                    <h4>{Math.floor(currentData.main.temp_min)}°C</h4>
                  </div>
                  <div className="weather_current_info">
                    <div>
                      <img
                        src="/img/sunrise.png"
                        alt="sunrise"
                        className="info_icon"
                      ></img>
                      <h4>{timestamp.sunrise}</h4>
                    </div>
                    <div>
                      <img
                        src="/img/sunset.png"
                        alt="sunset"
                        className="info_icon"
                      ></img>
                      <h4>{timestamp.sunset}</h4>
                    </div>
                    <div>
                      <img
                        src="/img/Wind.png"
                        alt="wind"
                        className="info_icon"
                      ></img>
                      <h4>{currentData.wind.speed} m/s</h4>
                    </div>
                    <div>
                      <img
                        src="/img/Humidity.png"
                        alt="humidity"
                        className="info_icon"
                      ></img>
                      <h4>{currentData.main.humidity}%</h4>
                    </div>
                    <div>
                      <img
                        src="/img/clouds.png"
                        alt="clouds"
                        className="info_icon"
                      ></img>
                      <h4>{currentData.clouds.all}%</h4>
                    </div>
                  </div>
                </div>
                <div className="weather_next_days">
                  <div className="weather_days_title">
                    <h3>Extended Forecast</h3>
                  </div>
                  {Object.values(dayForecast).map((element) => (
                    <DayForecast
                      key={element[0].dt_txt}
                      date={element[0].dt_txt}
                      main={element[0].main}
                      weather={element[0].weather}
                    />
                  ))}
                </div>
              </div>
              <div className="weather_hourly">
                <div className="hourly_date">
                  <h4>{day}</h4>
                </div>
                {hourForecast[1].map((element, index) => (
                <HourForecast
                  key={index}
                  date={element.dt_txt}
                  temp={element.main.temp_max}
                  weather={element.weather}
                />
              ))}
              </div>
            </div>
          </div>
        )}
    </>
  );
}
